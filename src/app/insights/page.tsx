import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata = {
  title: 'Insights',
  description: 'Articles on Platform Engineering, AI Governance, and Technology Leadership',
}

export default async function InsightsPage() {
  try {
    const supabase = createServerClient()

    const { data: articles, error } = await supabase
      .from('content')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (error) {
      console.error('Error fetching articles:', error)
      throw error
    }

    const categories = [...new Set(articles?.map(a => a.category).filter(Boolean))]

    return (
      <div className="min-h-screen bg-bg">
        {/* Hero */}
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="mb-12">
            <h1 className="text-5xl font-serif text-cream mb-4 leading-tight">
              Insights
            </h1>
            <p className="text-xl text-muted">
              Thoughts on Platform Engineering, AI Governance, and Technology Leadership
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-8 flex flex-wrap gap-2">
              <Link 
                href="/insights" 
                className="px-4 py-2 rounded-full bg-gold text-bg font-medium transition hover:bg-gold-2"
              >
                All
              </Link>
              {categories.map(category => (
                <span 
                  key={category}
                  className="px-4 py-2 rounded-full bg-panel border border-line-2 text-cream"
                >
                  {category}
                </span>
              ))}
            </div>
          )}

          {/* Articles Grid */}
          <div className="space-y-6">
            {articles && articles.length > 0 ? (
              articles.map(article => {
                const publishDate = article.published_at 
                  ? new Date(article.published_at).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })
                  : ''

                return (
                  <Link 
                    key={article.id}
                    href={`/insights/${article.slug}`}
                    className="group block p-6 rounded-xl border border-line-2 bg-panel hover:border-gold hover:bg-panel/80 transition"
                  >
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="flex-1">
                        {article.category && (
                          <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-xs font-medium mb-3 border border-gold/30">
                            {article.category}
                          </span>
                        )}
                        <h2 className="text-2xl font-serif text-cream group-hover:text-gold transition mb-2">
                          {article.title}
                        </h2>
                      </div>
                      {article.reading_time_minutes && (
                        <span className="text-muted text-sm whitespace-nowrap">
                          {article.reading_time_minutes}m
                        </span>
                      )}
                    </div>

                    {article.excerpt && (
                      <p className="text-muted mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                    )}

                    <div className="flex justify-between items-center text-sm text-muted">
                      <time dateTime={article.published_at}>
                        {publishDate}
                      </time>
                      <span className="text-gold group-hover:text-gold-2 transition">
                        Read more →
                      </span>
                    </div>
                  </Link>
                )
              })
            ) : (
              <div className="text-center py-16">
                <p className="text-muted text-lg">No articles published yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  } catch (error) {
    console.error('Error rendering insights page:', error)
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-cream mb-4">Error loading articles</h1>
          <p className="text-muted">Please try again later.</p>
        </div>
      </div>
    )
  }
}
