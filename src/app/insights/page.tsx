import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

const newsletterLabels = {
  'platform-path': 'The Platform Path',
  'ai-pulse': 'AI Pulse'
}

function groupByMonth(articles) {
  const groups = []
  const seen = {}
  for (const a of articles) {
    const d = a.published_at ? new Date(a.published_at) : null
    const key = d ? d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Undated'
    if (!seen[key]) {
      seen[key] = []
      groups.push([key, seen[key]])
    }
    seen[key].push(a)
  }
  return groups
}

function ArticleRow({ article }) {
  return (
    <div className="insight-card" style={{ borderBottom: '1px solid #333', paddingBottom: '32px', marginBottom: '32px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'flex-start' }}>
      {article.featured_image_url && (
        <Link href={`/insights/${article.slug}`}>
          <img src={article.featured_image_url} alt={article.title} className="insight-thumb" style={{ objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }} />
        </Link>
      )}
      <div>
        {article.newsletter && newsletterLabels[article.newsletter] && (
          <span style={{ display: 'inline-block', fontSize: '12px', color: '#C9A24B', border: '1px solid rgba(201,162,75,0.4)', borderRadius: '999px', padding: '2px 10px', marginBottom: '10px' }}>
            {newsletterLabels[article.newsletter]}
          </span>
        )}
        <Link href={`/insights/${article.slug}`}>
          <h2 style={{ marginBottom: '10px', cursor: 'pointer', color: '#C9A24B', fontSize: '22px' }}>{article.title}</h2>
        </Link>
        <p style={{ color: '#999', marginBottom: '12px', fontSize: '14px' }}>
          {new Date(article.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          {article.reading_time_minutes && ` • ${article.reading_time_minutes} min read`}
        </p>
        <p style={{ marginBottom: '12px', lineHeight: '1.6', color: '#ccc' }}>{article.excerpt}</p>
        <Link href={`/insights/${article.slug}`} style={{ color: '#C9A24B', textDecoration: 'none' }}>Read article →</Link>
      </div>
    </div>
  )
}

export default async function InsightsPage() {
  const supabase = createServerClient()
  const { data: articles } = await supabase
    .from('content')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  const grouped = groupByMonth(articles || [])

  return (
    <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <style>{`
        .insight-thumb { width: 180px; height: 120px; }
        .insight-card > div:last-child { flex: 1; min-width: 260px; }
        @media (max-width: 640px) {
          .insight-thumb { width: 100%; height: 200px; }
          .insight-card > a, .insight-card > a > img { width: 100%; }
        }
      `}</style>
      <h1 style={{ marginBottom: '10px' }}>Insights</h1>
      <p style={{ color: '#999', marginBottom: '30px' }}>
        Deep perspectives on AI, Platform Engineering, and Technology Leadership
      </p>

      {grouped.length > 1 && (
        <div style={{ marginBottom: '40px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {grouped.map(([month]) => (
            <a key={month} href={`#m-${month.replace(/\s/g, '-')}`} style={{ fontSize: '13px', color: '#999', border: '1px solid #333', borderRadius: '999px', padding: '4px 14px', textDecoration: 'none' }}>
              {month}
            </a>
          ))}
        </div>
      )}

      {grouped.length === 0 ? (
        <p>No articles yet. Create your first insight!</p>
      ) : (
        grouped.map(([month, items], idx) => (
          <details key={month} id={`m-${month.replace(/\s/g, '-')}`} open={idx === 0} style={{ marginBottom: '24px', scrollMarginTop: '20px' }}>
            <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0', borderBottom: '2px solid #C9A24B', marginBottom: '32px' }}>
              <span style={{ fontSize: '20px', fontFamily: 'serif', color: '#C9A24B' }}>{month}</span>
              <span style={{ fontSize: '13px', color: '#777' }}>{items.length} article{items.length > 1 ? 's' : ''}</span>
            </summary>
            {items.map((a) => <ArticleRow key={a.id} article={a} />)}
          </details>
        ))
      )}
    </div>
  )
}
