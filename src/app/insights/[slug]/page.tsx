import { createServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export const metadata = {
  title: 'Article',
  description: 'Read an article on Platform Engineering and AI Governance',
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  try {
    const supabase = createServerClient()

    const { data: article, error } = await supabase
      .from('content')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      console.error('Supabase error:', error)
      return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-serif text-cream mb-4">Article not found</h1>
            <p className="text-muted mb-6">The article you are looking for does not exist.</p>
            <Link href="/insights" className="text-gold hover:text-gold-2 transition">
              Back to all articles
            </Link>
          </div>
        </div>
      )
    }

    if (!article) {
      return (
        <div className="min-h-screen bg-bg flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-serif text-cream mb-4">Article not found</h1>
            <Link href="/insights" className="text-gold hover:text-gold-2 transition">
              Back to all articles
            </Link>
          </div>
        </div>
      )
    }

    const publishDate = article.published_at 
      ? new Date(article.published_at).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })
      : ''

    // Simple line-break rendering
    const contentLines = (article.content_markdown || '').split('\n\n').filter(Boolean)

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt || undefined,
    image: article.featured_image_url || undefined,
    datePublished: article.published_at || undefined,
    dateModified: article.updated_at || article.published_at || undefined,
    author: { "@type": "Person", name: "Rupali Gupta", url: "https://rupaligupta.in" },
    publisher: { "@type": "Person", name: "Rupali Gupta", url: "https://rupaligupta.in" },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://rupaligupta.in/insights/${article.slug}` },
  }

    return (
      <article className="min-h-screen bg-bg text-cream">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
        {/* Featured Image */}
        {article.featured_image_url && (
          <div className="w-full h-96 bg-panel overflow-hidden">
            <img 
              src={article.featured_image_url} 
              alt={article.featured_image_alt || article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content Container */}
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <header className="mb-12 border-b border-line-2 pb-8">
            <div className="mb-4 flex flex-wrap gap-3">
              {article.category && (
                <span className="inline-block px-3 py-1 rounded-full bg-gold/10 text-gold text-sm border border-gold/30">
                  {article.category}
                </span>
              )}
              {article.reading_time_minutes && (
                <span className="inline-block px-3 py-1 rounded-full bg-panel border border-line-2 text-muted text-sm">
                  {article.reading_time_minutes} min read
                </span>
              )}
            </div>

            <h1 className="text-5xl font-serif text-cream leading-tight mb-6">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl text-muted leading-relaxed mb-4">
                {article.excerpt}
              </p>
            )}

            <div className="flex gap-6 text-sm text-muted">
              {publishDate && <time dateTime={article.published_at}>{publishDate}</time>}
              <span>By Rupali Gupta</span>
            </div>
          </header>

          {/* Body */}
          <div className="space-y-6 text-lg leading-relaxed">
          {contentLines.map((paragraph: string, idx: number) => {
              // Handle headings        // Handle headings
              if (paragraph.startsWith('# ')) {
                return (
                  <h2 key={idx} className="text-4xl font-serif text-cream mt-8 mb-4">
                    {paragraph.slice(2)}
                  </h2>
                )
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h3 key={idx} className="text-3xl font-serif text-cream mt-6 mb-4">
                    {paragraph.slice(3)}
                  </h3>
                )
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={idx} className="text-2xl font-serif text-cream mt-4 mb-3">
                    {paragraph.slice(4)}
                  </h4>
                )
              }
              
              // Handle lists
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n').filter(l => l.startsWith('- '))
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="text-cream ml-4">
                        {item.slice(2)}
                      </li>
                    ))}
                  </ul>
                )
              }

              // Default paragraph
              return (
                <p key={idx} className="text-cream leading-relaxed">
                  {paragraph}
                </p>
              )
            })}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-line-2 space-y-4">
            {article.linkedin_url && (
              <a 
                href={article.linkedin_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition"
              >
                Discuss on LinkedIn
              </a>
            )}
            <div>
              <Link 
                href="/insights" 
                className="text-gold hover:text-gold-2 transition"
              >
                ← Back to all articles
              </Link>
            </div>
          </footer>
        </div>
      </article>
    )
  } catch (err: any) {
    console.error('Error:', err.message)
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-serif text-cream mb-4">Error loading article</h1>
          <p className="text-muted mb-6">{err.message}</p>
          <Link href="/insights" className="text-gold hover:text-gold-2 transition">
            Back to all articles
          </Link>
        </div>
      </div>
    )
  }
}
