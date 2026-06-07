import { createServerClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      slug,
      content_type = 'article',
      title,
      excerpt,
      content_markdown,
      featured_image_url,
      featured_image_alt,
      canonical_url,
      linkedin_url,
      newsletter_issue_number,
      seo_title,
      seo_description,
      category,
      tags = []
    } = body

    const supabase = createServerClient()

    // Get or create author (for now, use system author)
    const { data: author } = await supabase
      .from('authors')
      .select('id')
      .eq('slug', 'rupali-gupta')
      .single()

    if (!author) {
      return NextResponse.json(
        { error: 'Author not found' },
        { status: 400 }
      )
    }

    // Calculate reading time (roughly 200 words per minute)
    const reading_time_minutes = Math.ceil(
      (content_markdown?.split(/\s+/).length || 0) / 200
    )

    // Create article
    const { data: article, error } = await supabase
      .from('content')
      .insert({
        slug,
        content_type,
        title,
        excerpt,
        content_markdown,
        featured_image_url,
        featured_image_alt,
        reading_time_minutes,
        canonical_url,
        linkedin_url,
        newsletter_issue_number,
        author_id: author.id,
        status: 'draft',
        published: false
      })
      .select()
      .single()

    if (error) throw error

    // Add metadata
    if (category || tags.length > 0 || seo_title || seo_description) {
      await supabase
        .from('content_metadata')
        .insert({
          content_id: article.id,
          category,
          tags,
          seo_title: seo_title || title,
          seo_description: seo_description || excerpt
        })
    }

    return NextResponse.json(article, { status: 201 })
  } catch (error: any) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { searchParams } = new URL(request.url)
    
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    let query = supabase
      .from('content')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    if (status) query = query.eq('status', status)
    
    if (search) {
      query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`)
    }

    const { data: articles, count, error } = await query
      .range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({ articles, total: count })
  } catch (error: any) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
