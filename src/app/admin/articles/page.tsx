'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/articles?limit=50')
      .then(r => r.json())
      .then(d => setArticles(d.articles || []))
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    const res = await fetch(`/api/admin/articles/${id}`, { method: 'DELETE' })
    if (res.ok) setArticles(articles.filter(a => a.id !== id))
    else alert('Delete failed')
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h1>Articles</h1>
        <Link href="/admin/articles/new" style={{ padding: '10px 20px', background: '#C9A24B', color: '#000', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold' }}>+ New</Link>
      </div>
      {loading ? <p>Loading...</p> : articles.length === 0 ? <p>No articles yet.</p> : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {articles.map((a) => (
            <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#1a1a1a', borderRadius: '4px', borderLeft: `4px solid ${a.published ? '#51cf66' : '#ffd43b'}` }}>
              <div>
                <h3 style={{ margin: 0 }}>{a.title} {a.is_featured && <span style={{ color: '#C9A24B', fontSize: '12px' }}>★ Featured</span>}</h3>
                <p style={{ color: '#999', margin: '5px 0 0 0', fontSize: '14px' }}>{a.status} · /{a.slug}</p>
              </div>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <Link href={`/insights/${a.slug}`} style={{ color: '#888' }}>View</Link>
                <Link href={`/admin/articles/${a.id}/edit`} style={{ color: '#C9A24B' }}>Edit</Link>
                <button onClick={() => handleDelete(a.id, a.title)} style={{ background: 'transparent', border: '1px solid #ff6b6b', color: '#ff6b6b', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
