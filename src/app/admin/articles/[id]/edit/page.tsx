'use client'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'

export default function EditArticlePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id

  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ slug: '', title: '', excerpt: '', content_markdown: '', newsletter: '', featured_image_url: '', is_featured: false })

  useEffect(() => {
    fetch('/api/admin/articles/' + id)
      .then(r => r.json())
      .then(d => setForm({
        slug: d.slug || '',
        title: d.title || '',
        excerpt: d.excerpt || '',
        content_markdown: d.content_markdown || '',
        newsletter: d.newsletter || '',
        featured_image_url: d.featured_image_url || '',
        is_featured: d.is_featured || false
      }))
      .catch(() => setError('Could not load article'))
      .finally(() => setFetching(false))
  }, [id])

  const handleImageUpload = async (e: any) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error('Upload failed')
      const data = await res.json()
      setForm(f => ({ ...f, featured_image_url: data.url }))
    } catch (err: any) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/articles/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Update failed') }
      router.push('/admin/articles')
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const input = { padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }

  if (fetching) return <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>Loading...</div>

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Edit Article</h1>
      {error && <div style={{ color: '#ff6b6b', padding: '15px', background: 'rgba(255,107,107,0.1)', borderRadius: '4px', marginTop: '20px' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px', marginTop: '30px' }}>
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={input} />
        <div>
          <input type="text" placeholder="Slug" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required style={{ ...input, width: '100%' }} />
          <p style={{ color: '#666', fontSize: '12px', margin: '6px 0 0 0' }}>URL: rupaligupta.in/insights/{form.slug}</p>
        </div>
        <select value={form.newsletter} onChange={(e) => setForm({ ...form, newsletter: e.target.value })} required style={input}>
          <option value="">Select a newsletter...</option>
          <option value="platform-path">The Platform Path</option>
          <option value="ai-pulse">AI Pulse</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} style={{ width: '18px', height: '18px' }} />
          <span style={{ color: '#C9A24B' }}>Feature on homepage</span>
        </label>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#999', fontSize: '14px' }}>Featured Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ ...input, width: '100%' }} />
          {uploading && <p style={{ color: '#C9A24B', fontSize: '13px', marginTop: '8px' }}>Uploading...</p>}
          {form.featured_image_url && (
            <div style={{ marginTop: '12px' }}>
              <img src={form.featured_image_url} alt="preview" style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #333', display: 'block' }} />
              <button type="button" onClick={() => setForm({ ...form, featured_image_url: '' })} style={{ marginTop: '8px', background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}>Remove image</button>
            </div>
          )}
        </div>
        <textarea placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required rows={2} style={input} />
        <textarea placeholder="Content (Markdown)" value={form.content_markdown} onChange={(e) => setForm({ ...form, content_markdown: e.target.value })} required rows={12} style={{ ...input, fontFamily: 'monospace' }} />
        <button type="submit" disabled={loading || uploading} style={{ padding: '12px', background: '#C9A24B', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', opacity: (loading || uploading) ? 0.6 : 1 }}>{loading ? 'Saving...' : 'Save Changes'}</button>
      </form>
    </div>
  )
}
