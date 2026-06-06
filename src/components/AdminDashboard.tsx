'use client';

import { useState } from 'react';
import { Container, Section } from '@/components/ui';
import { events, awards, media } from '@/lib/data';

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<'events' | 'awards' | 'media' | 'gallery' | 'bio'>('events');
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-line-2 bg-bg/85 backdrop-blur">
        <Container className="py-4 flex items-center justify-between">
          <h1 className="text-xl text-cream">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-panel border border-line-2 text-sm text-cream hover:border-gold transition"
          >
            Logout
          </button>
        </Container>
      </div>

      <Section>
        <Container>
          {/* Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b border-line-2 pb-4">
            {(['events', 'awards', 'media', 'gallery', 'bio'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setShowAddForm(false);
                }}
                className={`px-4 py-2 rounded-lg transition capitalize ${
                  activeTab === tab
                    ? 'bg-gold text-bg font-medium'
                    : 'bg-panel border border-line-2 text-cream hover:border-gold'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Events Tab */}
          {activeTab === 'events' && <EventsSection events={events} />}

          {/* Awards Tab */}
          {activeTab === 'awards' && <AwardsSection awards={awards} />}

          {/* Media Tab */}
          {activeTab === 'media' && <MediaSection media={media} />}

          {/* Gallery Tab */}
          {activeTab === 'gallery' && <GallerySection />}

          {/* Bio Tab */}
          {activeTab === 'bio' && <BioSection />}
        </Container>
      </Section>
    </>
  );
}

/* Events Section */
function EventsSection({ events }: { events: any[] }) {
  const [newEvent, setNewEvent] = useState({ n: '', m: '', r: '', linkedIn: '' });

  const handleAddEvent = () => {
    if (newEvent.n && newEvent.m && newEvent.r) {
      const code = `{ n: "${newEvent.n}", m: "${newEvent.m}", r: "${newEvent.r}", linkedIn: "${newEvent.linkedIn}" }`;
      alert(`Add this to src/lib/data.ts events array:\n\n${code}`);
      setNewEvent({ n: '', m: '', r: '', linkedIn: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-cream mb-4">Speaking Engagements</h2>
        <div className="space-y-3">
          {events.map((e, i) => (
            <div key={i} className="p-4 rounded-lg bg-panel border border-line-2">
              <h3 className="text-cream font-medium">{e.n}</h3>
              <p className="text-sm text-muted mt-1">{e.m}</p>
              <div className="flex gap-3 mt-3">
                <span className="text-xs bg-bg px-2 py-1 rounded text-gold">{e.r}</span>
                {e.linkedIn && (
                  <a href={e.linkedIn} target="_blank" rel="noopener" className="text-xs text-gold hover:text-gold-2">
                    LinkedIn Link
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line-2 pt-6">
        <h3 className="text-lg text-cream mb-4">Add New Event</h3>
        <div className="space-y-3 max-w-2xl">
          <input
            type="text"
            placeholder="Event name"
            value={newEvent.n}
            onChange={(e) => setNewEvent({ ...newEvent, n: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            placeholder="Description"
            value={newEvent.m}
            onChange={(e) => setNewEvent({ ...newEvent, m: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            placeholder="Role (Speaker, Panelist, etc.)"
            value={newEvent.r}
            onChange={(e) => setNewEvent({ ...newEvent, r: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          />
          <input
            type="url"
            placeholder="LinkedIn post URL (optional)"
            value={newEvent.linkedIn}
            onChange={(e) => setNewEvent({ ...newEvent, linkedIn: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          />
          <button
            onClick={handleAddEvent}
            className="w-full px-4 py-2 rounded bg-gold text-bg font-medium hover:bg-gold-2 transition"
          >
            Generate Code & Copy
          </button>
        </div>
      </div>
    </div>
  );
}

/* Awards Section */
function AwardsSection({ awards }: { awards: any[] }) {
  const [newAward, setNewAward] = useState({ y: '', h: '', s: '' });

  const handleAddAward = () => {
    if (newAward.y && newAward.h && newAward.s) {
      const code = `{ y: "${newAward.y}", h: "${newAward.h}", s: "${newAward.s}" }`;
      alert(`Add this to src/lib/data.ts awards array:\n\n${code}`);
      setNewAward({ y: '', h: '', s: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-cream mb-4">Awards & Recognition</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {awards.map((a, i) => (
            <div key={i} className="p-4 rounded-lg bg-panel border border-line-2">
              <p className="text-xs text-gold font-mono">{a.y}</p>
              <h3 className="text-cream font-medium mt-1">{a.h}</h3>
              <p className="text-xs text-muted mt-2">{a.s}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line-2 pt-6">
        <h3 className="text-lg text-cream mb-4">Add New Award</h3>
        <div className="space-y-3 max-w-2xl">
          <input
            type="text"
            placeholder="Year or number (e.g., 2025, 2x, Top 1%)"
            value={newAward.y}
            onChange={(e) => setNewAward({ ...newAward, y: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            placeholder="Award title"
            value={newAward.h}
            onChange={(e) => setNewAward({ ...newAward, h: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            placeholder="Issuing organization and details"
            value={newAward.s}
            onChange={(e) => setNewAward({ ...newAward, s: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          />
          <button
            onClick={handleAddAward}
            className="w-full px-4 py-2 rounded bg-gold text-bg font-medium hover:bg-gold-2 transition"
          >
            Generate Code & Copy
          </button>
        </div>
      </div>
    </div>
  );
}

/* Media Section */
function MediaSection({ media }: { media: any[] }) {
  const [newMedia, setNewMedia] = useState({ type: '', h: '', p: '' });

  const handleAddMedia = () => {
    if (newMedia.type && newMedia.h && newMedia.p) {
      const code = `{ type: "${newMedia.type}", h: "${newMedia.h}", p: "${newMedia.p}" }`;
      alert(`Add this to src/lib/data.ts media array:\n\n${code}`);
      setNewMedia({ type: '', h: '', p: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl text-cream mb-4">Media Coverage</h2>
        <div className="space-y-3">
          {media.map((m, i) => (
            <div key={i} className="p-4 rounded-lg bg-panel border border-line-2">
              <span className="text-xs text-gold font-mono">{m.type}</span>
              <h3 className="text-cream font-medium mt-1">{m.h}</h3>
              <p className="text-sm text-muted mt-2">{m.p}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-line-2 pt-6">
        <h3 className="text-lg text-cream mb-4">Add New Media</h3>
        <div className="space-y-3 max-w-2xl">
          <select
            value={newMedia.type}
            onChange={(e) => setNewMedia({ ...newMedia, type: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          >
            <option value="">Select type...</option>
            <option value="Interview">Interview</option>
            <option value="Publication">Publication</option>
            <option value="Article">Article</option>
            <option value="Feature">Feature</option>
          </select>
          <input
            type="text"
            placeholder="Title"
            value={newMedia.h}
            onChange={(e) => setNewMedia({ ...newMedia, h: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          />
          <input
            type="text"
            placeholder="Description"
            value={newMedia.p}
            onChange={(e) => setNewMedia({ ...newMedia, p: e.target.value })}
            className="w-full px-3 py-2 rounded bg-bg border border-line-2 text-cream text-sm focus:outline-none focus:border-gold"
          />
          <button
            onClick={handleAddMedia}
            className="w-full px-4 py-2 rounded bg-gold text-bg font-medium hover:bg-gold-2 transition"
          >
            Generate Code & Copy
          </button>
        </div>
      </div>
    </div>
  );
}

/* Gallery Section */
function GallerySection() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg bg-panel border border-line-2">
        <h2 className="text-xl text-cream mb-4">Add Gallery Images</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted mb-3">
              To add new photos to your gallery:
            </p>
            <ol className="text-sm text-muted space-y-2 ml-4 list-decimal">
              <li>Upload image(s) to GitHub folder: <code className="bg-bg px-2 py-1 rounded text-gold text-xs">public/images/</code></li>
              <li>The gallery will auto-update (no code changes needed)</li>
              <li>Images are displayed in reverse date order</li>
            </ol>
          </div>
          
          <div className="mt-4 p-4 rounded bg-bg border border-line-2">
            <p className="text-xs text-gold mb-2">Current Gallery Images: 31</p>
            <p className="text-xs text-muted">Visit <a href="/gallery" className="text-gold hover:text-gold-2">/gallery</a> to see all images</p>
          </div>

          <div className="mt-6 p-4 rounded bg-bg border border-gold/30">
            <p className="text-sm text-cream font-medium mb-2">Quick Steps:</p>
            <ol className="text-xs text-muted space-y-1 ml-4 list-decimal">
              <li>Go to GitHub repo: <code className="text-gold">guptarupali/rupali-website</code></li>
              <li>Navigate to <code className="text-gold">public/images/</code> folder</li>
              <li>Click "Upload files" and select your photos</li>
              <li>Vercel auto-deploys (60 seconds)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Bio Section */
function BioSection() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-lg bg-panel border border-line-2">
        <h2 className="text-xl text-cream mb-4">Update Bio & Stats</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-muted mb-3">To update your home page or bio:</p>
            <ol className="text-sm text-muted space-y-2 ml-4 list-decimal">
              <li><strong>Homepage hero text:</strong> Edit <code className="bg-bg px-2 py-1 rounded text-gold text-xs">src/app/page.tsx</code></li>
              <li><strong>Professional stats:</strong> Edit <code className="bg-bg px-2 py-1 rounded text-gold text-xs">src/lib/data.ts</code> (stats array)</li>
              <li><strong>Media kit bio:</strong> Edit <code className="bg-bg px-2 py-1 rounded text-gold text-xs">src/app/media/page.tsx</code></li>
              <li><strong>Timeline/experience:</strong> Edit <code className="bg-bg px-2 py-1 rounded text-gold text-xs">src/lib/data.ts</code> (timeline array)</li>
            </ol>
          </div>

          <div className="mt-6 p-4 rounded bg-bg border border-gold/30">
            <p className="text-sm text-cream font-medium mb-3">Current Home Page Stats:</p>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2 rounded bg-panel border border-line-2">
                <p className="text-gold">£50M+</p>
                <p className="text-muted">Portfolios led</p>
              </div>
              <div className="p-2 rounded bg-panel border border-line-2">
                <p className="text-gold">300+</p>
                <p className="text-muted">Engineers led</p>
              </div>
              <div className="p-2 rounded bg-panel border border-line-2">
                <p className="text-gold">~60%</p>
                <p className="text-muted">Cloud cost reduction</p>
              </div>
              <div className="p-2 rounded bg-panel border border-line-2">
                <p className="text-gold">$15M+</p>
                <p className="text-muted">Annual savings</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded border border-line-2 bg-bg">
            <p className="text-xs text-muted">For bio updates or to modify stats/timeline, DM me the details and I'll update them in seconds.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
