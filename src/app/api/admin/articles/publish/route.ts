import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { articleId } = body

    const now = new Date().toISOString()
    
    const { data, error } = await supabase
      .from('content')
      .update({
        published: true,
        status: 'published',
        published_at: now
      })
      .eq('id', articleId)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ success: true, article: data })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
