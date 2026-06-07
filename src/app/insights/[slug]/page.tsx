import { createServerClient } from '@/lib/supabase/server'

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
      console.error('Looking for slug:', slug)
      return <div style={{padding: '40px'}}><h1>Article not found (Error: {error.code})</h1></div>
    }

    if (!article) {
      return <div style={{padding: '40px'}}><h1>Article not found</h1></div>
    }

    return (
      <div style={{padding: '40px', maxWidth: '800px', margin: '0 auto'}}>
        <h1>{article.title}</h1>
        <p style={{color: '#999', marginBottom: '20px'}}>{article.excerpt}</p>
        <div style={{lineHeight: '1.6'}}>
          {article.content_markdown}
        </div>
      </div>
    )
  } catch (err: any) {
    console.error('Error:', err.message)
    return <div style={{padding: '40px'}}><h1>Error: {err.message}</h1></div>
  }
}
