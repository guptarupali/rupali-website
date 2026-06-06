'use client';

import { useState } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('guptarupali@gmail.com');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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

      if (response.ok) {
        setStep('code');
        setMessage('OTP sent! Check your email.');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Error sending OTP');
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

      if (response.ok) {
        setIsAuthenticated(true);
        setCode('');
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid OTP');
      }
    } catch (err) {
      setError('Error verifying OTP');
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
        <p className="text-sm text-muted mb-6">Email OTP access</p>

        {step === 'email' ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-sm text-cream mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="guptarupali@gmail.com"
                className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold"
                required
              />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}
            {message && <p className="text-sm text-gold">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div>
              <label className="block text-sm text-cream mb-2">Code</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="000000"
                maxLength={6}
                className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold text-center text-lg tracking-widest"
                required
              />
              <p className="text-xs text-muted mt-2">Check email (10 min expiry)</p>
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>

            <button
              type="button"
              onClick={() => {
                setStep('email');
                setCode('');
                setError('');
              }}
              className="w-full py-2 rounded-lg border border-line-2 text-cream hover:border-gold transition"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
