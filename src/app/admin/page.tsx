'use client';

import { useState } from 'react';
import { AdminDashboard } from '@/components/AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple password check (change this to your secure password)
    const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'rupali-admin-2024';
    
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
      setPassword('');
    } else {
      setError('Invalid password');
      setPassword('');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-4">
        <div className="w-full max-w-md rounded-2xl border border-line-2 bg-panel p-8">
          <h1 className="text-2xl text-cream mb-2">Admin Dashboard</h1>
          <p className="text-sm text-muted mb-6">Manage your site content</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-cream mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold"
              />
            </div>
            
            {error && <p className="text-sm text-red-400">{error}</p>}
            
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
    </div>
  );
}
