import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('awards').select('*').order('sort_year', { ascending: false })
    if (error) throw error
    return NextResponse.json({ awards: data })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const { year, title, subtitle } = await request.json()
    const match = String(year).match(/\d{4}/)
    const sort_year = match ? parseInt(match[0]) : 9999
    const supabase = createAdminClient()
    const { data, error } = await supabase.from('awards').insert({ year, title, subtitle, sort_year }).select().single()
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
    const { error } = await supabase.from('awards').delete().eq('id', id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
