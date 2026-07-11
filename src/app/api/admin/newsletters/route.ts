import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data: settings, error } = await supabase
      .from('newsletter_settings')
      .select('*')
      .order('slug')
    if (error) throw error
    return NextResponse.json({ settings })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { slug, banner_url } = await request.json()
    const supabase = createAdminClient()
    const { error } = await supabase
      .from('newsletter_settings')
      .update({ banner_url })
      .eq('slug', slug)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
