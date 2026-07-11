import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('gallery').select('*').order('sort_order', { ascending: true })
    if (error) throw error
    return NextResponse.json({ images: data })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { image_url, alt } = await request.json()
    const supabase = createAdminClient()
    const { data: existing } = await supabase.from('gallery').select('sort_order').order('sort_order', { ascending: false }).limit(1)
    const nextOrder = existing && existing.length ? (existing[0].sort_order + 1) : 0
    const { data, error } = await supabase.from('gallery').insert({ image_url, alt: alt || 'Event photo', sort_order: nextOrder }).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json()
    const supabase = createAdminClient()
    const { error } = await supabase.from('gallery').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
