// Shared OTP storage for admin authentication
// In production, use Vercel KV or a database

const otpStore = new Map<string, { code: string; expiresAt: number }>();

// Cleanup expired OTPs every minute
if (typeof window === 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, value] of otpStore.entries()) {
      if (value.expiresAt < now) {
        otpStore.delete(key);
      }
    }
  }, 60000);
}

export function storeOtp(email: string, code: string) {
  otpStore.set(email, {
    code,
    expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
  });
}

export function getOtp(email: string) {
  return otpStore.get(email);
}

export function deleteOtp(email: string) {
  otpStore.delete(email);
}
