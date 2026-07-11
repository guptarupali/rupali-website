import Link from 'next/link'
import { createServerClient } from '@/lib/supabase/server'

export default async function AdminPage() {
  const supabase = createServerClient()
  const { data: articles } = await supabase.from('content').select('id, published')
  const published = (articles || []).filter(a => a.published).length
  const drafts = (articles || []).filter(a => !a.published).length

  const sections = [
    { href: '/admin/articles', title: 'Articles', desc: 'Create, edit, publish, and feature insights' },
    { href: '/admin/articles/new', title: 'New Article', desc: 'Write and publish a new insight' },
    { href: '/admin/newsletters', title: 'Newsletter Banners', desc: 'Upload banners for Platform Path and AI Pulse' },
    { href: '/admin/awards', title: 'Awards', desc: 'Add and manage recognitions' },
    { href: '/admin/gallery', title: 'Gallery', desc: 'Upload and manage event photos' },
  ]

  const card = {
    display: 'block',
    padding: '24px',
    background: '#141414',
    borderRadius: '10px',
    textDecoration: 'none',
    color: 'inherit',
    border: '1px solid #2a2a2a',
  }

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Admin Dashboard</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '40px' }}>
        <div style={{ padding: '20px', background: '#141414', borderRadius: '10px' }}>
          <p style={{ color: '#999', margin: '0 0 8px 0', fontSize: '14px' }}>Published Articles</p>
          <h2 style={{ margin: 0, fontSize: '32px', color: '#C9A24B' }}>{published}</h2>
        </div>
        <div style={{ padding: '20px', background: '#141414', borderRadius: '10px' }}>
          <p style={{ color: '#999', margin: '0 0 8px 0', fontSize: '14px' }}>Drafts</p>
          <h2 style={{ margin: 0, fontSize: '32px' }}>{drafts}</h2>
        </div>
      </div>

      <h2 style={{ fontSize: '18px', marginBottom: '16px', color: '#999' }}>Manage Content</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {sections.map((s) => (
          <Link key={s.href} href={s.href} style={card}>
            <h3 style={{ margin: '0 0 6px 0', fontSize: '17px' }}>{s.title}</h3>
            <p style={{ color: '#999', margin: 0, fontSize: '14px' }}>{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
