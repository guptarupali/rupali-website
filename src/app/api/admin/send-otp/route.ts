import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

// Mark as dynamic to prevent initialization during build
export const dynamic = 'force-dynamic';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY not configured' },
        { status: 500 }
      );
    }

    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const otp = Math.random().toString().slice(2, 8);

    await resend.emails.send({
      from: 'noreply@rupaligupta.in',
      to: email,
      subject: 'Your OTP Code',
      html: `<p>Your OTP is: <strong>${otp}</strong></p>`,
    });

    return NextResponse.json({ success: true, otp });
  } catch (error) {
    console.error('Send OTP error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
