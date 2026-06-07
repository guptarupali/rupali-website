#!/bin/bash
set -e

echo "🚀 Setting up Rupali's Platform..."
echo ""

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Make sure you're in the rupali-website directory"
    exit 1
fi

# Collect credentials
echo "📋 Enter your Supabase credentials"
echo ""
echo "Get these from: https://app.supabase.com → Settings → API"
echo ""

read -p "Enter NEXT_PUBLIC_SUPABASE_URL: " SUPABASE_URL
read -p "Enter NEXT_PUBLIC_SUPABASE_ANON_KEY: " SUPABASE_ANON_KEY
read -sp "Enter SUPABASE_SERVICE_ROLE_KEY: " SUPABASE_SERVICE_ROLE_KEY
echo ""

# Create .env.local
cat > .env.local << ENVEOF
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_GA_ID=G-PW3PYBXPPS
ENVEOF

echo ""
echo "✅ Created .env.local"
echo ""

# Create directories
mkdir -p src/lib/supabase
mkdir -p src/app/api/content
mkdir -p src/app/api/topics
mkdir -p src/app/api/subscribers
mkdir -p src/app/api/admin/articles
mkdir -p src/components
mkdir -p scripts
mkdir -p docs

echo "✅ Created directories"
echo ""

# Create Supabase client
cat > src/lib/supabase/client.ts << 'TSEOF'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
TSEOF

echo "✅ Created Supabase client"
echo ""

# Create database schema SQL
cat > scripts/create-schema.sql << 'SQLEOF'
-- Authors
CREATE TABLE IF NOT EXISTS authors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Topics
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  pillar TEXT NOT NULL,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- Content
CREATE TABLE IF NOT EXISTS content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  content_type TEXT NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content_markdown TEXT,
  thumbnail_url TEXT,
  author_id UUID REFERENCES authors(id),
  status TEXT DEFAULT 'draft',
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now()
);

-- Metadata
CREATE TABLE IF NOT EXISTS content_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  category TEXT,
  tags TEXT[],
  primary_topic_id UUID REFERENCES topics(id),
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Knowledge Graph
CREATE TABLE IF NOT EXISTS topic_content_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic_id UUID REFERENCES topics(id) ON DELETE CASCADE,
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(topic_id, content_id)
);

-- Subscribers
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  email_verified BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_content_published ON content(published);
CREATE INDEX IF NOT EXISTS idx_topic_mappings_topic ON topic_content_mappings(topic_id);
SQLEOF

echo "✅ Created database schema"
echo ""

# Create API routes directory structure
mkdir -p src/app/api/content/\[slug\]
mkdir -p src/app/api/topics/\[slug\]
mkdir -p src/app/api/admin/articles/\[id\]/publish

echo "✅ Created API route directories"
echo ""

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://app.supabase.com"
echo "2. Open SQL Editor"
echo "3. Copy contents of: scripts/create-schema.sql"
echo "4. Paste and run in Supabase"
echo "5. Come back here for next step"
echo ""
