import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  return NextResponse.json(
    { message: 'OTP auth coming soon' },
    { status: 200 }
  )
}
