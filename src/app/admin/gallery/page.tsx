'use client'
import { useEffect, useState } from 'react'

export default function GalleryAdminPage() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState('')

  const load = () => {
    fetch('/api/admin/gallery').then(r => r.json()).then(d => setImages(d.images || [])).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const uploadMany = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    setUploading(true)
    let done = 0
    for (const file of files) {
      setProgress(`Uploading ${done + 1} of ${files.length}...`)
      try {
        const fd = new FormData()
        fd.append('file', file)
        const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
        if (!up.ok) throw new Error('Upload failed')
        const { url } = await up.json()
        await fetch('/api/admin/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image_url: url }) })
        done++
      } catch (err) {
        console.error('Failed on', file.name, err)
      }
    }
    setProgress(`Uploaded ${done} of ${files.length}`)
    setUploading(false)
    load()
    e.target.value = ''
  }

  const remove = async (id) => {
    if (!confirm('Remove this photo from the gallery?')) return
    await fetch('/api/admin/gallery', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setImages(images.filter(i => i.id !== id))
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>Gallery</h1>
      <p style={{ color: '#999', fontSize: '14px', marginTop: '6px' }}>{images.length} photos</p>

      <div style={{ margin: '24px 0', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
        <label style={{ display: 'block', marginBottom: '8px', color: '#999', fontSize: '14px' }}>Upload photos (select multiple)</label>
        <input type="file" accept="image/*" multiple onChange={uploadMany} style={{ padding: '10px', background: '#0d0d0d', border: '1px solid #333', color: '#fff', borderRadius: '4px', width: '100%' }} />
        {uploading && <p style={{ color: '#C9A24B', fontSize: '13px', marginTop: '8px' }}>{progress}</p>}
        {!uploading && progress && <p style={{ color: '#51cf66', fontSize: '13px', marginTop: '8px' }}>{progress}</p>}
      </div>

      {loading ? <p>Loading...</p> : images.length === 0 ? <p style={{ color: '#999' }}>No photos yet. Upload some above.</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          {images.map((img) => (
            <div key={img.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={img.image_url} alt={img.alt} style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
              <button onClick={() => remove(img.id)} style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.75)', border: '1px solid #ff6b6b', color: '#ff6b6b', borderRadius: '4px', padding: '2px 9px', cursor: 'pointer', fontSize: '13px' }}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
