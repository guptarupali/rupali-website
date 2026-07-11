import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata = {
  title: 'AI Pulse',
  description: 'AI governance, agentic systems, and enterprise AI.',
}

const monthOrder = ['December', 'November', 'October', 'September', 'August', 'July', 'June', 'May', 'April', 'March', 'February', 'January']

function groupByYearMonth(articles) {
  const years = {}
  for (const a of articles) {
    const d = a.published_at ? new Date(a.published_at) : null
    const year = d ? d.getFullYear() : 'Undated'
    const month = d ? d.toLocaleDateString('en-US', { month: 'long' }) : ''
    if (!years[year]) years[year] = {}
    if (!years[year][month]) years[year][month] = []
    years[year][month].push(a)
  }
  return Object.entries(years).sort((a, b) => Number(b[0]) - Number(a[0]))
}

export default async function AiPulsePage() {
  const supabase = createServerClient()
  const { data: settings } = await supabase.from('newsletter_settings').select('*').eq('slug', 'ai-pulse').single()
  const { data: articles } = await supabase
    .from('content').select('*').eq('published', true).eq('newsletter', 'ai-pulse')
    .order('published_at', { ascending: false })

  const grouped = groupByYearMonth(articles || [])

  return (
    <div className="min-h-screen bg-bg text-cream">
      {settings?.banner_url && (
        <div className="w-full overflow-hidden">
          <img src={settings.banner_url} alt="AI Pulse" className="w-full object-cover" />
        </div>
      )}
      <div className="max-w-4xl px-6 md:px-16 py-16">
        <a href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7466541904743034880" target="_blank" rel="noopener noreferrer"
           className="inline-block px-6 py-3 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition mb-12">
          Subscribe on LinkedIn
        </a>

        {grouped.length > 1 && (
          <div className="mb-12">
            <p className="text-sm text-muted mb-3">Jump to year</p>
            <div className="flex flex-wrap gap-3">
              {grouped.map(([year]) => (
                <a key={year} href={`#year-${year}`} className="px-4 py-1.5 rounded-full border border-line-2 text-sm text-muted hover:text-gold hover:border-gold transition">{year}</a>
              ))}
            </div>
          </div>
        )}

        {grouped.length > 0 ? grouped.map(([year, months]) => (
          <div key={year} id={`year-${year}`} className="mb-16 scroll-mt-8">
            <h2 className="text-3xl font-serif text-gold mb-8 border-b border-line-2 pb-4">{year}</h2>
            {monthOrder.filter(m => months[m]).map((month) => (
              <div key={month} className="mb-10">
                <h3 className="text-cream/70 mb-5 uppercase tracking-wide text-sm">{month}</h3>
                <div className="grid gap-8">
                  {months[month].map((a) => (
                    <div key={a.id} className="border-b border-line-2 pb-8">
                      <Link href={`/insights/${a.slug}`}>
                        <h4 className="text-2xl font-serif text-cream hover:text-gold transition mb-2">{a.title}</h4>
                      </Link>
                      <p className="text-sm text-muted mb-3">
                        {a.published_at && new Date(a.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        {a.reading_time_minutes && ` · ${a.reading_time_minutes} min read`}
                      </p>
                      <p className="text-muted mb-3">{a.excerpt}</p>
                      <Link href={`/insights/${a.slug}`} className="text-gold hover:text-gold-2 transition">Read article →</Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )) : (
          <p className="text-muted">No articles in this newsletter yet.</p>
        )}
      </div>
    </div>
  )
}
