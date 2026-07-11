'use client'
import { useEffect, useState } from 'react'

export default function MediaKitAdminPage() {
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [savedId, setSavedId] = useState('')
  const [newCred, setNewCred] = useState({ label: '', value: '' })
  const [newTopic, setNewTopic] = useState('')

  const load = () => {
    fetch('/api/admin/media-kit').then(r => r.json()).then(d => setItems(d.items || [])).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const credentials = items.filter(i => i.section === 'credential')
  const topics = items.filter(i => i.section === 'topic')
  const bioShort = items.find(i => i.section === 'bio-short')
  const bioLong = items.find(i => i.section === 'bio-long')
  const headshots = items.filter(i => i.section === 'headshot')

  const saveEdit = async (id: string, label: string, value: string) => {
    await fetch('/api/admin/media-kit', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, label, value }) })
  }

  const addCred = async () => {
    if (!newCred.value) return
    await fetch('/api/admin/media-kit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'credential', label: newCred.label, value: newCred.value }) })
    setNewCred({ label: '', value: '' })
    load()
  }

  const addTopic = async () => {
    if (!newTopic) return
    await fetch('/api/admin/media-kit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'topic', value: newTopic }) })
    setNewTopic('')
    load()
  }

  const remove = async (id: string) => {
    if (!confirm('Delete this item?')) return
    await fetch('/api/admin/media-kit', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setItems(items.filter(i => i.id !== id))
  }

  const updateLocal = (id: string, field: string, val: string) => {
    setItems(items.map(i => i.id === id ? { ...i, [field]: val } : i))
  }

  const input = { padding: '9px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px', width: '100%' }
  const btn = { padding: '9px 16px', background: '#C9A24B', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold' as const, cursor: 'pointer' }

  const [uploadingPhoto, setUploadingPhoto] = useState(false)
  const uploadHeadshot = async (e: any) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingPhoto(true)
    try {
      const fd = new FormData()
      fd.append('file', file)
      const up = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      if (!up.ok) throw new Error('Upload failed')
      const { url } = await up.json()
      await fetch('/api/admin/media-kit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ section: 'headshot', value: url }) })
      load()
    } catch (err: any) {
      alert('Upload failed: ' + err.message)
    } finally {
      setUploadingPhoto(false)
    }
  }

  if (loading) return <div style={{ padding: '40px' }}>Loading...</div>

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Media Kit</h1>

      <h2 style={{ marginTop: '30px', fontSize: '18px', color: '#C9A24B' }}>Professional Headshots</h2>
      <div style={{ marginTop: '14px', marginBottom: '20px' }}>
        <input type="file" accept="image/*" onChange={uploadHeadshot} style={{ ...input, padding: '9px' }} />
        {uploadingPhoto && <p style={{ color: '#C9A24B', fontSize: '13px', marginTop: '8px' }}>Uploading...</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px', marginTop: '14px' }}>
          {headshots.map((h) => (
            <div key={h.id} style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden' }}>
              <img src={h.value} alt="headshot" style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
              <button onClick={() => remove(h.id)} style={{ position: 'absolute', top: '6px', right: '6px', background: 'rgba(0,0,0,0.75)', border: '1px solid #ff6b6b', color: '#ff6b6b', borderRadius: '4px', padding: '2px 8px', cursor: 'pointer', fontSize: '12px' }}>Delete</button>
            </div>
          ))}
        </div>
      </div>

      <h2 style={{ marginTop: '30px', fontSize: '18px', color: '#C9A24B' }}>Biography</h2>
      <div style={{ display: 'grid', gap: '14px', marginTop: '14px' }}>
        {bioShort && (
          <div>
            <label style={{ display: 'block', color: '#999', fontSize: '13px', marginBottom: '6px' }}>Short Bio</label>
            <textarea value={bioShort.value || ''} onChange={(e) => updateLocal(bioShort.id, 'value', e.target.value)} rows={3} style={{ ...input, fontFamily: 'inherit' }} />
            <button onClick={() => saveEdit(bioShort.id, bioShort.label, bioShort.value)} style={{ ...btn, marginTop: '8px' }}>{savedId === bioShort.id ? 'Saved!' : 'Save Short Bio'}</button>
          </div>
        )}
        {bioLong && (
          <div>
            <label style={{ display: 'block', color: '#999', fontSize: '13px', marginBottom: '6px' }}>Long Bio</label>
            <textarea value={bioLong.value || ''} onChange={(e) => updateLocal(bioLong.id, 'value', e.target.value)} rows={7} style={{ ...input, fontFamily: 'inherit' }} />
            <button onClick={() => saveEdit(bioLong.id, bioLong.label, bioLong.value)} style={{ ...btn, marginTop: '8px' }}>{savedId === bioLong.id ? 'Saved!' : 'Save Long Bio'}</button>
          </div>
        )}
      </div>

      <h2 style={{ marginTop: '30px', fontSize: '18px', color: '#C9A24B' }}>Key Credentials</h2>
      <div style={{ display: 'grid', gap: '10px', marginTop: '14px' }}>
        {credentials.map((c) => (
          <div key={c.id} style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto auto', gap: '8px', alignItems: 'center' }}>
            <input value={c.label || ''} onChange={(e) => updateLocal(c.id, 'label', e.target.value)} style={input} />
            <input value={c.value || ''} onChange={(e) => updateLocal(c.id, 'value', e.target.value)} style={input} />
            <button onClick={() => saveEdit(c.id, c.label, c.value)} style={btn}>Save</button>
            <button onClick={() => remove(c.id)} style={{ background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '9px 12px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr auto', gap: '8px', marginTop: '8px' }}>
          <input placeholder="New label" value={newCred.label} onChange={(e) => setNewCred({ ...newCred, label: e.target.value })} style={input} />
          <input placeholder="New value" value={newCred.value} onChange={(e) => setNewCred({ ...newCred, value: e.target.value })} style={input} />
          <button onClick={addCred} style={btn}>+ Add</button>
        </div>
      </div>

      <h2 style={{ marginTop: '40px', fontSize: '18px', color: '#C9A24B' }}>Speaking Topics</h2>
      <div style={{ display: 'grid', gap: '10px', marginTop: '14px' }}>
        {topics.map((t) => (
          <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '8px', alignItems: 'center' }}>
            <input value={t.value || ''} onChange={(e) => updateLocal(t.id, 'value', e.target.value)} style={input} />
            <button onClick={() => saveEdit(t.id, null as any, t.value)} style={btn}>Save</button>
            <button onClick={() => remove(t.id)} style={{ background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '9px 12px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', marginTop: '8px' }}>
          <input placeholder="New topic" value={newTopic} onChange={(e) => setNewTopic(e.target.value)} style={input} />
          <button onClick={addTopic} style={btn}>+ Add</button>
        </div>
      </div>
    </div>
  )
}
