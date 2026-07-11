'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
}

export default function NewArticlePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [slugEdited, setSlugEdited] = useState(false)
  const [form, setForm] = useState({ slug: '', title: '', excerpt: '', content_markdown: '', category: '', tags: '', newsletter: '', featured_image_url: '', is_featured: false })

  const handleTitle = (title) => {
    setForm(f => ({ ...f, title, slug: slugEdited ? f.slug : slugify(title) }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!res.ok) { const err = await res.json(); throw new Error(err.error || 'Upload failed') }
      const data = await res.json()
      setForm(f => ({ ...f, featured_image_url: data.url }))
    } catch (err) {
      setError(err.message)
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const createRes = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, slug: slugify(form.slug), tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [] })
      })
      if (!createRes.ok) { const err = await createRes.json(); throw new Error(err.error || 'Failed to create article') }
      const article = await createRes.json()

      const publishRes = await fetch('/api/admin/articles/' + article.id + '/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      if (!publishRes.ok) { const err = await publishRes.json(); throw new Error(err.error || 'Failed to publish article') }

      router.push('/insights/' + article.slug)
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const input = { padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Create Article</h1>
      {error && <div style={{ color: '#ff6b6b', padding: '15px', background: 'rgba(255,107,107,0.1)', borderRadius: '4px', marginTop: '20px' }}>{error}</div>}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px', marginTop: '30px' }}>
        <input type="text" placeholder="Title" value={form.title} onChange={(e) => handleTitle(e.target.value)} required style={input} />
        <div>
          <input type="text" placeholder="Slug (auto-generated)" value={form.slug} onChange={(e) => { setSlugEdited(true); setForm({ ...form, slug: e.target.value }) }} required style={{ ...input, width: '100%' }} />
          <p style={{ color: '#666', fontSize: '12px', margin: '6px 0 0 0' }}>URL: rupaligupta.in/insights/{form.slug || 'your-slug'}</p>
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
        <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <input type="checkbox" checked={form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} style={{ width: '18px', height: '18px' }} />
          <span style={{ color: '#C9A24B' }}>Feature on homepage</span>
        </label>
        <div>
          <label style={{ display: 'block', marginBottom: '8px', color: '#999', fontSize: '14px' }}>Featured Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ ...input, width: '100%' }} />
          {uploading && <p style={{ color: '#C9A24B', fontSize: '13px', marginTop: '8px' }}>Uploading...</p>}
          {form.featured_image_url && (
            <img src={form.featured_image_url} alt="preview" style={{ marginTop: '12px', maxWidth: '100%', borderRadius: '8px', border: '1px solid #333' }} />
          )}
        </div>
        <textarea placeholder="Excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} required rows={2} style={input} />
        <textarea placeholder="Content (Markdown)" value={form.content_markdown} onChange={(e) => setForm({ ...form, content_markdown: e.target.value })} required rows={12} style={{ ...input, fontFamily: 'monospace' }} />
        <input type="text" placeholder="Category (optional)" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={input} />
        <input type="text" placeholder="Tags, comma-separated (optional)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} style={input} />
        <button type="submit" disabled={loading || uploading} style={{ padding: '12px', background: '#C9A24B', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', opacity: (loading || uploading) ? 0.6 : 1 }}>{loading ? 'Publishing...' : 'Publish Article'}</button>
      </form>
    </div>
  )
}
