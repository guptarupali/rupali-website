import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { slug, title, excerpt, content } = body

    // Create author if doesn't exist
    const { data: author } = await supabase
      .from('authors')
      .select('id')
      .eq('email', 'guptarupali@gmail.com')
      .single()

    let authorId = author?.id

    if (!authorId) {
      const { data: newAuthor } = await supabase
        .from('authors')
        .insert({
          slug: 'rupali-gupta',
          name: 'Rupali Gupta',
          email: 'guptarupali@gmail.com'
        })
        .select()
        .single()
      authorId = newAuthor?.id
    }

    // Create article
    const { data: article, error } = await supabase
      .from('content')
      .insert({
        slug,
        content_type: 'article',
        title,
        excerpt: excerpt || '',
        content_markdown: content,
        author_id: authorId,
        status: 'draft',
        published: false
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(article, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
