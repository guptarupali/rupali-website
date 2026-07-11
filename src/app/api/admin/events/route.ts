import { createAdminClient } from "@/lib/supabase/admin"
import { NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createAdminClient()
    const { data, error } = await supabase.from("events").select("*").order("sort_order")
    if (error) throw error
    return NextResponse.json({ events: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, description, role, linkedin_url } = await request.json()
    const supabase = createAdminClient()
    const { data: existing } = await supabase.from("events").select("sort_order").order("sort_order", { ascending: false }).limit(1)
    const nextOrder = existing && existing.length ? existing[0].sort_order + 1 : 0
    const { data, error } = await supabase.from("events").insert({ name, description, role, linkedin_url, sort_order: nextOrder }).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, name, description, role, linkedin_url } = await request.json()
    const supabase = createAdminClient()
    const { error } = await supabase.from("events").update({ name, description, role, linkedin_url }).eq("id", id)
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
    const { error } = await supabase.from("events").delete().eq("id", id)
    if (error) throw error
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
