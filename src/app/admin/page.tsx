'use client';

import { useState } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';

function maskEmail(email: string) {
  const [local, domain] = email.split('@');
  const maskedLocal = local.charAt(0) + '*'.repeat(local.length - 2) + local.charAt(local.length - 1);
  return `${maskedLocal}@${domain}`;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('guptarupali@gmail.com');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/admin/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStep('code');
        setMessage('✓ Code sent! Check your email.');
        setResendDisabled(true);
        setResendCountdown(60);
        
        // Countdown timer
        const interval = setInterval(() => {
          setResendCountdown(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              setResendDisabled(false);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setError(data.error || 'Failed to send. Try again.');
      }
    } catch (err) {
      setError('Connection error. Check internet and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setCode('');
      } else {
        setError(data.error || 'Invalid code');
      }
    } catch (err) {
      setError('Verification failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg">
        <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md rounded-2xl border border-line-2 bg-panel p-8">
        <h1 className="text-2xl text-cream mb-2">Admin Dashboard</h1>
        <p className="text-sm text-muted mb-6">Email verification</p>

        {step === 'email' ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-sm text-cream mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold"
                required
              />
            </div>

            {error && <p className="text-sm text-red-400">⚠ {error}</p>}
            {message && <p className="text-sm text-gold">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Access Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="p-3 rounded-lg bg-bg border border-line-2">
              <p className="text-xs text-muted mb-1">Sending to:</p>
              <p className="text-sm text-cream font-mono">{maskEmail(email)}</p>
            </div>

            <div>
              <label className="block text-sm text-cream mb-2">Enter Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold text-center text-2xl tracking-widest font-mono"
                required
              />
              <p className="text-xs text-muted mt-2">6-digit code from your email (10 min expiry)</p>
            </div>

            {error && <p className="text-sm text-red-400">⚠ {error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>

            <button
              type="button"
              onClick={handleSendOTP}
              disabled={resendDisabled || loading}
              className="w-full py-2 rounded-lg border border-line-2 text-cream hover:border-gold transition disabled:opacity-40 text-sm"
            >
              {resendDisabled ? `Resend in ${resendCountdown}s` : 'Resend Code'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setError('');
                setMessage('');
                setResendDisabled(false);
                setResendCountdown(0);
              }}
              className="w-full py-2 rounded-lg text-cream hover:text-gold transition text-sm"
            >
              Use Different Email
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
