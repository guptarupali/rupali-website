import { NextRequest, NextResponse } from 'next/server';
import { getOtp, deleteOtp } from '@/lib/otp-storage';

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json();

    // Validate email
    if (email !== 'guptarupali@gmail.com') {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 401 }
      );
    }

    // Check if OTP exists and is valid
    const storedOtp = getOtp(email);

    if (!storedOtp) {
      return NextResponse.json(
        { error: 'No OTP found. Please request a new one.' },
        { status: 400 }
      );
    }

    if (Date.now() > storedOtp.expiresAt) {
      deleteOtp(email);
      return NextResponse.json(
        { error: 'OTP expired. Please request a new one.' },
        { status: 400 }
      );
    }

    if (code !== storedOtp.code) {
      return NextResponse.json(
        { error: 'Invalid OTP. Please try again.' },
        { status: 401 }
      );
    }

    // OTP is valid, clean up
    deleteOtp(email);

    return NextResponse.json(
      { message: 'OTP verified successfully', authenticated: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('OTP verify error:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
