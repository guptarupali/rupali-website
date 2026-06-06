import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { storeOtp } from '@/lib/otp-storage';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Validate email
    if (email !== 'guptarupali@gmail.com') {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 401 }
      );
    }

    // Check if RESEND_API_KEY is configured
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY not configured');
      return NextResponse.json(
        { error: 'Email service not configured. Please contact support.' },
        { status: 500 }
      );
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP
    storeOtp(email, code);

    // Send email via Resend
    try {
      await resend.emails.send({
        from: 'Admin <onboarding@resend.dev>',
        to: email,
        subject: 'Your Admin Dashboard Access Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #0A0C10; color: #F4F0E6; padding: 20px;">
            <h2 style="color: #C9A24B; margin-top: 0;">Your Access Code</h2>
            <p>You requested access to the Rupali Gupta admin dashboard.</p>
            <div style="background: #1a1a1a; border: 2px solid #C9A24B; padding: 30px; text-align: center; border-radius: 8px; margin: 30px 0;">
              <p style="margin: 0; color: #C9A24B; font-size: 48px; font-weight: bold; letter-spacing: 8px; font-family: 'Courier New', monospace;">${code}</p>
            </div>
            <p style="color: #999; font-size: 14px; margin: 20px 0;">Enter this code to access your admin dashboard.</p>
            <p style="color: #999; font-size: 12px;">⏰ This code expires in 10 minutes.</p>
            <p style="color: #999; font-size: 12px; margin-bottom: 0;">🔒 If you didn't request this, you can safely ignore this email.</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send OTP email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'OTP sent to your email', expiresIn: 600 },
      { status: 200 }
    );
  } catch (error) {
    console.error('OTP send error:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
