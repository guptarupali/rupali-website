'use client';

import { useState, useEffect } from 'react';

interface Item {
  id: string;
  [key: string]: any;
}

interface DashboardData {
  awards?: Item[];
  events?: Item[];
  media?: Item[];
  recommendations?: Item[];
  advisoryServices?: Item[];
  speakingTopics?: Item[];
  bio?: string;
}

export function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<string>('blog');
  const [data, setData] = useState<DashboardData>({});
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const tabs = [
    { id: 'blog', label: 'Blog Posts' },
    { id: 'newsletter', label: 'Newsletters' },
    { id: 'awards', label: 'Awards' },
    { id: 'events', label: 'Speaking Events' },
    { id: 'media', label: 'Media' },
    { id: 'recommendations', label: 'Recommendations' },
    { id: 'advisoryServices', label: 'Advisory Services' },
    { id: 'speakingTopics', label: 'Speaking Topics' },
    { id: 'bio', label: 'Bio' },
  ];

  useEffect(() => {
    fetchData();
    loadBlogPosts();
  }, []);

  useEffect(() => {
    if (activeTab === 'blog' || activeTab === 'newsletter') {
      loadBlogPosts();
    }
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/admin/data?entity=all');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Failed to load data');
      setLoading(false);
    }
  };

  const loadBlogPosts = async () => {
    // For now, we'll track published posts in localStorage
    // In a real app, this would fetch from an API
    try {
      const stored = localStorage.getItem(`${activeTab}_posts`);
      if (stored) {
        const posts = JSON.parse(stored);
        if (activeTab === 'blog') {
          setBlogPosts(posts);
        } else {
          setNewsletters(posts);
        }
      }
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  };

  const addPublishedPost = (post: any) => {
    try {
      if (activeTab === 'blog') {
        const updated = [post, ...blogPosts.filter(p => p.slug !== post.slug)];
        setBlogPosts(updated);
        localStorage.setItem('blog_posts', JSON.stringify(updated));
      } else {
        const updated = [post, ...newsletters.filter(p => p.slug !== post.slug)];
        setNewsletters(updated);
        localStorage.setItem('newsletter_posts', JSON.stringify(updated));
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleNew = () => {
    setEditingId('new');
    setFormData({});
  };

  const handleEdit = (item: Item) => {
    setEditingId(item.id);
    setFormData({ ...item });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    setSaving(true);
    try {
      if (activeTab === 'blog' || activeTab === 'newsletter') {
        const response = await fetch('/api/admin/content', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: activeTab, slug: id }),
        });

        if (response.ok) {
          setMessage('✓ Deleted successfully');
          loadBlogPosts();
          setEditingId(null);
        } else {
          setMessage('✗ Failed to delete');
        }
      } else {
        const response = await fetch('/api/admin/data', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entity: activeTab, id }),
        });

        if (response.ok) {
          setMessage('✓ Deleted successfully');
          fetchData();
          setEditingId(null);
        } else {
          setMessage('✗ Failed to delete');
        }
      }
    } catch (error) {
      setMessage('✗ Error deleting');
    } finally {
      setSaving(false);
    }
  };

  const handleSave = async () => {
    if (activeTab === 'blog' || activeTab === 'newsletter') {
      // Blog/Newsletter save
      if (!formData.title || !formData.title.trim()) {
        setMessage('⚠ Title is required');
        return;
      }
      if (!formData.slug || !formData.slug.trim()) {
        setMessage('⚠ Slug (URL) is required');
        return;
      }
      if (!formData.content || !formData.content.trim()) {
        setMessage('⚠ Content is required');
        return;
      }

      setSaving(true);
      setMessage('');
      try {
        const method = editingId === 'new' ? 'POST' : 'PUT';
        
        const payload = {
          type: activeTab,
          title: formData.title.trim(),
          slug: formData.slug.trim().toLowerCase().replace(/\s+/g, '-'),
          excerpt: formData.excerpt?.trim() || '',
          category: formData.category?.trim() || '',
          date: formData.date || new Date().toISOString(),
          content: formData.content.trim(),
        };

        console.log('Publishing with payload:', payload);

        const response = await fetch('/api/admin/content', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        console.log('Response:', response.status, data);

        if (response.ok) {
          setMessage('✓ Published successfully!');
          
          // Track the published post locally
          addPublishedPost({
            slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
            title: formData.title,
            excerpt: formData.excerpt || '',
            date: formData.date || new Date().toISOString(),
          });
          
          setTimeout(() => {
            setEditingId(null);
            setFormData({});
            loadBlogPosts();
          }, 1000);
        } else {
          setMessage(`✗ Error: ${data.error || 'Failed to publish'}`);
        }
      } catch (error) {
        console.error('Publish error:', error);
        setMessage(`✗ Error: ${error instanceof Error ? error.message : 'Failed to publish'}`);
      } finally {
        setSaving(false);
      }
    } else {
      // Regular data save
      if (!validateForm()) return;

      setSaving(true);
      try {
        const url = editingId === 'new' ? '/api/admin/data' : '/api/admin/data';
        const method = editingId === 'new' ? 'POST' : 'PUT';

        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            entity: activeTab,
            id: editingId === 'new' ? undefined : editingId,
            item: formData,
          }),
        });

        if (response.ok) {
          setMessage('✓ Saved successfully');
          fetchData();
          setEditingId(null);
          setFormData({});
        } else {
          setMessage('✗ Failed to save');
        }
      } catch (error) {
        setMessage('✗ Error saving');
      } finally {
        setSaving(false);
      }
    }
  };

  const validateForm = () => {
    if (activeTab === 'bio') {
      if (!formData.bio || formData.bio.trim().length === 0) {
        setMessage('⚠ Bio cannot be empty');
        return false;
      }
      return true;
    }

    if (activeTab === 'awards') {
      if (!formData.year || !formData.title) {
        setMessage('⚠ Year and Title are required');
        return false;
      }
    } else if (activeTab === 'events') {
      if (!formData.name || !formData.description) {
        setMessage('⚠ Name and Description are required');
        return false;
      }
    } else if (activeTab === 'media') {
      if (!formData.type || !formData.title) {
        setMessage('⚠ Type and Title are required');
        return false;
      }
    } else if (activeTab === 'recommendations') {
      if (!formData.text || !formData.name) {
        setMessage('⚠ Text and Name are required');
        return false;
      }
    } else if (activeTab === 'advisoryServices' || activeTab === 'speakingTopics') {
      if (!formData.title || !formData.description) {
        setMessage('⚠ Title and Description are required');
        return false;
      }
    }

    return true;
  };

  if (loading) {
    return <div className="text-cream p-8">Loading...</div>;
  }

  const currentData = data[activeTab as keyof DashboardData] || [];
  const isEditing = editingId !== null;

  return (
    <div className="min-h-screen bg-bg p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl text-cream">Admin Dashboard</h1>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-red-900/30 border border-red-600 text-red-300 hover:bg-red-900/50 transition"
          >
            Logout
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-line-2 pb-4">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setEditingId(null);
                setFormData({});
              }}
              className={`px-4 py-2 rounded-t-lg transition ${
                activeTab === tab.id
                  ? 'bg-gold text-bg font-medium'
                  : 'text-cream hover:bg-panel'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {message && (
          <div className="mb-4 p-3 rounded-lg bg-panel border border-line-2 text-cream text-sm">
            {message}
          </div>
        )}

        <div className="bg-panel border border-line-2 rounded-xl p-6">
          {activeTab === 'bio' ? (
            <BioEditor
              data={formData}
              setData={setFormData}
              isEditing={isEditing}
              onEdit={() => setEditingId('edit')}
              onSave={handleSave}
              onCancel={() => setEditingId(null)}
              saving={saving}
            />
          ) : activeTab === 'blog' || activeTab === 'newsletter' ? (
            <>
              {!isEditing && (
                <button
                  onClick={handleNew}
                  className="mb-6 px-4 py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition"
                >
                  + Write New {activeTab === 'blog' ? 'Post' : 'Newsletter'}
                </button>
              )}

              {isEditing ? (
                <BlogEditor
                  type={activeTab}
                  post={formData}
                  setPost={setFormData}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  saving={saving}
                />
              ) : (
                <BlogList
                  type={activeTab}
                  posts={activeTab === 'blog' ? blogPosts : newsletters}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </>
          ) : (
            <>
              {!isEditing && (
                <button
                  onClick={handleNew}
                  className="mb-6 px-4 py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition"
                >
                  + Add New {tabs.find(t => t.id === activeTab)?.label.slice(0, -1)}
                </button>
              )}

              {isEditing ? (
                <ItemForm
                  tabId={activeTab}
                  item={formData}
                  setItem={setFormData}
                  onSave={handleSave}
                  onCancel={() => setEditingId(null)}
                  saving={saving}
                />
              ) : (
                <ItemList
                  tabId={activeTab}
                  items={currentData as Item[]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ItemForm({
  tabId,
  item,
  setItem,
  onSave,
  onCancel,
  saving,
}: {
  tabId: string;
  item: any;
  setItem: (item: any) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  const renderFields = () => {
    switch (tabId) {
      case 'awards':
        return (
          <>
            <input placeholder="Year (e.g., 2025)" value={item.year || ''} onChange={e => setItem({ ...item, year: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold" />
            <input placeholder="Award Title" value={item.title || ''} onChange={e => setItem({ ...item, title: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold" />
            <textarea placeholder="Subtitle/Details" value={item.subtitle || ''} onChange={e => setItem({ ...item, subtitle: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold h-24" />
          </>
        );
      case 'events':
        return (
          <>
            <input placeholder="Event Name" value={item.name || ''} onChange={e => setItem({ ...item, name: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold" />
            <textarea placeholder="Description" value={item.description || ''} onChange={e => setItem({ ...item, description: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold h-24" />
            <input placeholder="Role (Speaker, Panelist, etc)" value={item.role || ''} onChange={e => setItem({ ...item, role: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold" />
            <input placeholder="LinkedIn URL" value={item.linkedinUrl || ''} onChange={e => setItem({ ...item, linkedinUrl: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold" />
          </>
        );
      case 'media':
        return (
          <>
            <select value={item.type || ''} onChange={e => setItem({ ...item, type: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold">
              <option value="">Select Type</option>
              <option value="Interview">Interview</option>
              <option value="Publication">Publication</option>
              <option value="Article">Article</option>
            </select>
            <input placeholder="Title" value={item.title || ''} onChange={e => setItem({ ...item, title: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold" />
            <textarea placeholder="Description" value={item.description || ''} onChange={e => setItem({ ...item, description: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold h-24" />
          </>
        );
      case 'recommendations':
        return (
          <>
            <textarea placeholder="Recommendation Text" value={item.text || ''} onChange={e => setItem({ ...item, text: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold h-32" />
            <input placeholder="Person Name" value={item.name || ''} onChange={e => setItem({ ...item, name: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold" />
            <input placeholder="Title/Organization" value={item.title || ''} onChange={e => setItem({ ...item, title: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold" />
          </>
        );
      case 'advisoryServices':
      case 'speakingTopics':
        return (
          <>
            <input placeholder="Title" value={item.title || ''} onChange={e => setItem({ ...item, title: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold" />
            <textarea placeholder="Description" value={item.description || ''} onChange={e => setItem({ ...item, description: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream mb-4 focus:outline-none focus:border-gold h-24" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderFields()}
      <div className="flex gap-4">
        <button onClick={onSave} disabled={saving} className="flex-1 px-4 py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition disabled:opacity-50">
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-line-2 text-cream hover:border-gold transition">
          Cancel
        </button>
      </div>
    </div>
  );
}

function ItemList({
  tabId,
  items,
  onEdit,
  onDelete,
}: {
  tabId: string;
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
}) {
  const getItemDisplay = (item: Item) => {
    switch (tabId) {
      case 'awards':
        return `${item.year} - ${item.title}`;
      case 'events':
        return `${item.name} (${item.role})`;
      case 'media':
        return `[${item.type}] ${item.title}`;
      case 'recommendations':
        return `${item.name} - ${item.title}`;
      case 'advisoryServices':
      case 'speakingTopics':
        return item.title;
      default:
        return 'Item';
    }
  };

  if (items.length === 0) {
    return <p className="text-muted text-center py-8">No items yet. Create one to get started.</p>;
  }

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex justify-between items-center p-4 rounded-lg bg-bg border border-line-2 hover:border-gold transition">
          <span className="text-cream">{getItemDisplay(item)}</span>
          <div className="flex gap-2">
            <button onClick={() => onEdit(item)} className="px-3 py-1 rounded text-sm bg-gold/20 text-gold hover:bg-gold/30 transition">
              Edit
            </button>
            <button onClick={() => onDelete(item.id)} className="px-3 py-1 rounded text-sm bg-red-900/20 text-red-400 hover:bg-red-900/30 transition">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function BioEditor({
  data,
  setData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  saving,
}: {
  data: any;
  setData: (data: any) => void;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  if (!isEditing) {
    return (
      <div className="space-y-4">
        <p className="text-cream leading-relaxed">{data.bio || 'No bio set'}</p>
        <button onClick={onEdit} className="px-4 py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition">
          Edit Bio
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <textarea value={data.bio || ''} onChange={e => setData({ ...data, bio: e.target.value })} className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold h-48" placeholder="Enter your bio" />
      <div className="flex gap-4">
        <button onClick={onSave} disabled={saving} className="flex-1 px-4 py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition disabled:opacity-50">
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-line-2 text-cream hover:border-gold transition">
          Cancel
        </button>
      </div>
    </div>
  );
}

function BlogEditor({
  type,
  post,
  setPost,
  onSave,
  onCancel,
  saving,
}: {
  type: string;
  post: any;
  setPost: (post: any) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-cream mb-2 block">Title</label>
          <input
            placeholder="Post Title"
            value={post.title || ''}
            onChange={e => setPost({ ...post, title: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-sm text-cream mb-2 block">Slug (URL friendly)</label>
          <input
            placeholder="post-slug"
            value={post.slug || ''}
            onChange={e => setPost({ ...post, slug: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold"
          />
        </div>
      </div>

      {type === 'blog' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-cream mb-2 block">Category</label>
            <input
              placeholder="e.g., Platform Engineering"
              value={post.category || ''}
              onChange={e => setPost({ ...post, category: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-sm text-cream mb-2 block">Date</label>
            <input
              type="date"
              value={post.date ? post.date.split('T')[0] : new Date().toISOString().split('T')[0]}
              onChange={e => setPost({ ...post, date: new Date(e.target.value).toISOString() })}
              className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold"
            />
          </div>
        </div>
      )}

      <div>
        <label className="text-sm text-cream mb-2 block">Excerpt/Description</label>
        <textarea
          placeholder="Brief summary (shows in listings)"
          value={post.excerpt || ''}
          onChange={e => setPost({ ...post, excerpt: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold h-20"
        />
      </div>

      <div>
        <label className="text-sm text-cream mb-2 block">Content (Markdown)</label>
        <textarea
          placeholder="Write your post here... Supports Markdown"
          value={post.content || ''}
          onChange={e => setPost({ ...post, content: e.target.value })}
          className="w-full px-4 py-2 rounded-lg bg-bg border border-line-2 text-cream focus:outline-none focus:border-gold h-96 font-mono text-sm"
        />
      </div>

      <div className="flex gap-4">
        <button onClick={onSave} disabled={saving} className="flex-1 px-4 py-2 rounded-lg bg-gold text-bg font-medium hover:bg-gold-2 transition disabled:opacity-50">
          {saving ? 'Publishing...' : 'Publish'}
        </button>
        <button onClick={onCancel} className="flex-1 px-4 py-2 rounded-lg border border-line-2 text-cream hover:border-gold transition">
          Cancel
        </button>
      </div>
    </div>
  );
}

function BlogList({
  type,
  posts,
  onEdit,
  onDelete,
}: {
  type: string;
  posts: any[];
  onEdit: (post: any) => void;
  onDelete: (id: string) => void;
}) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted mb-4">No posts published yet.</p>
        <p className="text-sm text-muted">Posts you publish from this admin will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map(post => (
        <div
          key={post.slug}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-lg bg-bg border border-line-2 hover:border-gold transition gap-3"
        >
          <div className="flex-1">
            <p className="text-cream font-medium">{post.title}</p>
            <p className="text-muted text-sm">{post.slug}</p>
            {post.date && <p className="text-muted text-xs mt-1">{new Date(post.date).toLocaleDateString()}</p>}
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              onClick={() => onEdit(post)}
              className="flex-1 sm:flex-none px-4 py-2 rounded text-sm bg-gold/20 text-gold hover:bg-gold/30 transition font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => {
                if (confirm(`Delete "${post.title}"?`)) {
                  onDelete(post.slug);
                }
              }}
              className="flex-1 sm:flex-none px-4 py-2 rounded text-sm bg-red-900/30 text-red-400 hover:bg-red-900/50 transition font-medium border border-red-600/30"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
