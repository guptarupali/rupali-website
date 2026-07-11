'use client'
import { useEffect, useState } from 'react'

export default function RecommendationsAdminPage() {
  const [recs, setRecs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ name: '', role: '', text: '' })
  const [saving, setSaving] = useState(false)
  const [editId, setEditId] = useState('')
  const [editForm, setEditForm] = useState({ name: '', role: '', text: '' })

  const load = () => {
    fetch('/api/admin/recommendations').then(r => r.json()).then(d => setRecs(d.recommendations || [])).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const add = async () => {
    if (!form.name || !form.text) { alert('Name and text are required'); return }
    setSaving(true)
    try {
      const res = await fetch('/api/admin/recommendations', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed to add')
      setForm({ name: '', role: '', text: '' })
      load()
    } catch (err: any) {
      alert(err.message)
    } finally {
      setSaving(false)
    }
  }

  const startEdit = (r: any) => {
    setEditId(r.id)
    setEditForm({ name: r.name, role: r.role || '', text: r.text })
  }

  const saveEdit = async () => {
    await fetch('/api/admin/recommendations', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: editId, ...editForm }) })
    setEditId('')
    load()
  }

  const remove = async (id: string, name: string) => {
    if (!confirm('Delete recommendation from ' + name + '?')) return
    await fetch('/api/admin/recommendations', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) })
    setRecs(recs.filter(r => r.id !== id))
  }

  const input = { padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px', width: '100%' }
  const btn = { padding: '10px 16px', background: '#C9A24B', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold' as const, cursor: 'pointer' }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Recommendations</h1>
      <div style={{ display: 'grid', gap: '10px', marginTop: '24px', padding: '20px', background: '#1a1a1a', borderRadius: '8px' }}>
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} style={input} />
        <input placeholder="Role / Company" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} style={input} />
        <textarea placeholder="Recommendation text" value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} rows={3} style={{ ...input, fontFamily: 'inherit' }} />
        <button onClick={add} disabled={saving} style={btn}>{saving ? 'Adding...' : '+ Add Recommendation'}</button>
      </div>
      <div style={{ marginTop: '30px', display: 'grid', gap: '12px' }}>
        {loading ? <p>Loading...</p> : recs.map((r) => (
          <div key={r.id} style={{ padding: '16px', background: '#1a1a1a', borderRadius: '6px' }}>
            {editId === r.id ? (
              <div style={{ display: 'grid', gap: '8px' }}>
                <input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} style={input} />
                <input value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value })} style={input} />
                <textarea value={editForm.text} onChange={(e) => setEditForm({ ...editForm, text: e.target.value })} rows={3} style={{ ...input, fontFamily: 'inherit' }} />
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={saveEdit} style={btn}>Save</button>
                  <button onClick={() => setEditId('')} style={{ background: 'transparent', border: '1px solid #666', color: '#999', padding: '8px 14px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '15px' }}>{r.name}</h3>
                  <p style={{ margin: '2px 0 8px 0', color: '#C9A24B', fontSize: '13px' }}>{r.role}</p>
                  <p style={{ margin: 0, color: '#ccc', fontSize: '14px' }}>{r.text}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button onClick={() => startEdit(r)} style={{ background: 'transparent', border: '1px solid #C9A24B', color: '#C9A24B', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => remove(r.id, r.name)} style={{ background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
