import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('media_kit').select('*').order('section').order('sort_order')
    if (error) throw error
    return NextResponse.json({ items: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { section, label, value } = await request.json()
    const supabase = createAdminClient()
    const { data: existing } = await supabase.from('media_kit').select('sort_order').eq('section', section).order('sort_order', { ascending: false }).limit(1)
    const nextOrder = existing && existing.length ? existing[0].sort_order + 1 : 0
    const { data, error } = await supabase.from('media_kit').insert({ section, label: label || null, value, sort_order: nextOrder }).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, label, value } = await request.json()
    const supabase = createAdminClient()
    const { error } = await supabase.from('media_kit').update({ label, value }).eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()
    const supabase = createAdminClient()
    const { error } = await supabase.from('media_kit').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
