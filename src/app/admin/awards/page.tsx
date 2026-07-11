'use client'
import { useEffect, useState } from 'react'

export default function AwardsAdminPage() {
  const [awards, setAwards] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ year: '', title: '', subtitle: '' })
  const [saving, setSaving] = useState(false)

  const load = () => {
    fetch('/api/admin/awards').then(r => r.json()).then(d => setAwards(d.awards || [])).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const add = async (e: any) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch('/api/admin/awards', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed to add')
      setForm({ year: '', title: '', subtitle: '' })
      load()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const remove = async (id, title) => {
    if (!confirm(`Delete "${title}"?`)) return
    await fetch('/api/admin/awards', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setAwards(awards.filter(a => a.id !== id))
  }

  const input = { padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Awards</h1>
      <form onSubmit={add} style={{ display: 'grid', gap: '12px', marginTop: '24px', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
        <input type="text" placeholder="Year (e.g. 2026 or 2x)" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} required style={input} />
        <input type="text" placeholder="Award title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={input} />
        <input type="text" placeholder="Subtitle / organization" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} style={input} />
        <button type="submit" disabled={saving} style={{ padding: '10px', background: '#C9A24B', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>{saving ? 'Adding...' : '+ Add Award'}</button>
      </form>

      <div style={{ marginTop: '30px', display: 'grid', gap: '12px' }}>
        {loading ? <p>Loading...</p> : awards.map((a) => (
          <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', background: '#1a1a1a', borderRadius: '6px' }}>
            <div>
              <span style={{ color: '#C9A24B', fontSize: '13px', fontFamily: 'monospace' }}>{a.year}</span>
              <h3 style={{ margin: '4px 0 0 0', fontSize: '16px' }}>{a.title}</h3>
              <p style={{ margin: '2px 0 0 0', color: '#999', fontSize: '13px' }}>{a.subtitle}</p>
            </div>
            <button onClick={() => remove(a.id, a.title)} style={{ background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
