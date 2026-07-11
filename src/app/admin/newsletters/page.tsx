'use client'
import { useEffect, useState } from 'react'

export default function NewsletterAdminPage() {
  const [settings, setSettings] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploadingSlug, setUploadingSlug] = useState('')
  const [msg, setMsg] = useState('')

  const load = () => {
    fetch('/api/admin/newsletters')
      .then(r => r.json())
      .then(d => setSettings(d.settings || []))
      .finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const handleUpload = async (slug, e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingSlug(slug)
    setMsg('')
    try {
      const fd = new FormData()
      fd.append('file', file)
      const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!up.ok) throw new Error('Upload failed')
      const { url } = await up.json()

      const save = await fetch('/api/admin/newsletters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, banner_url: url })
      })
      if (!save.ok) { const err = await save.json(); throw new Error(err.error || 'Save failed') }

      setSettings(prev => prev.map(s => s.slug === slug ? { ...s, banner_url: url } : s))
      setMsg('Banner saved for ' + slug)
    } catch (err: any) {
      setMsg('Error: ' + err.message)
    } finally {
      setUploadingSlug('')
    }
  }

  const input = { padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px', width: '100%' }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Newsletter Banners</h1>
      {msg && <p style={{ color: '#C9A24B', marginTop: '10px' }}>{msg}</p>}
      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gap: '30px', marginTop: '30px' }}>
          {settings.map((s) => (
            <div key={s.slug} style={{ padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
              <h3 style={{ margin: '0 0 4px 0' }}>{s.name}</h3>
              <p style={{ color: '#999', fontSize: '14px', margin: '0 0 15px 0' }}>{s.description}</p>
              {s.banner_url && <img src={s.banner_url} alt={s.name} style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '15px' }} />}
              <label style={{ display: 'block', marginBottom: '8px', color: '#999', fontSize: '14px' }}>Upload banner image</label>
              <input type="file" accept="image/*" onChange={(e) => handleUpload(s.slug, e)} style={input} />
              {uploadingSlug === s.slug && <p style={{ color: '#C9A24B', fontSize: '13px', marginTop: '8px' }}>Uploading...</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
