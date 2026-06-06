import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = 'guptarupali/rupali-website';
const GITHUB_BRANCH = 'main';

async function getFileFromGitHub(filePath: string) {
  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token not configured');
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      sha: data.sha,
      content: Buffer.from(data.content, 'base64').toString('utf-8'),
    };
  } catch (error) {
    console.error('Error fetching file:', error);
    return null;
  }
}

async function saveFileToGitHub(
  filePath: string,
  content: string,
  message: string,
  sha?: string
) {
  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token not configured');
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

  // Get SHA if not provided
  let fileSha = sha;
  if (!fileSha) {
    const existing = await getFileFromGitHub(filePath);
    fileSha = existing?.sha;
  }

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `${message} via admin dashboard`,
      content: Buffer.from(content).toString('base64'),
      branch: GITHUB_BRANCH,
      ...(fileSha && { sha: fileSha }),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to save file: ${error}`);
  }

  return response.json();
}

async function deleteFileFromGitHub(filePath: string, message: string) {
  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token not configured');
  }

  const fileData = await getFileFromGitHub(filePath);
  if (!fileData) {
    throw new Error('File not found');
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `${message} via admin dashboard`,
      sha: fileData.sha,
      branch: GITHUB_BRANCH,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to delete file: ${error}`);
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  try {
    const type = request.nextUrl.searchParams.get('type'); // 'blog' or 'newsletter'
    const slug = request.nextUrl.searchParams.get('slug');

    if (!type) {
      return NextResponse.json({ error: 'Type required' }, { status: 400 });
    }

    const dir = type === 'blog' ? 'content/posts' : 'content/newsletters';

    if (slug) {
      const filePath = `${dir}/${slug}.md`;
      const fileData = await getFileFromGitHub(filePath);

      if (!fileData) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      return NextResponse.json({ content: fileData.content, slug });
    }

    // List all posts (simplified - just return empty for now, UI will handle local list)
    return NextResponse.json({ items: [] });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, title, slug, excerpt, category, date, content } = await request.json();

    if (!type || !title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content required' },
        { status: 400 }
      );
    }

    if (!GITHUB_TOKEN) {
      console.error('GITHUB_TOKEN not configured');
      return NextResponse.json(
        { error: 'GitHub token not configured. Add GITHUB_TOKEN to Vercel environment variables.' },
        { status: 500 }
      );
    }

    const dir = type === 'blog' ? 'content/posts' : 'content/newsletters';
    const filePath = `${dir}/${slug}.md`;

    // Create front matter for markdown
    const frontMatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date || new Date().toISOString()}
${excerpt ? `excerpt: "${excerpt.replace(/"/g, '\\"')}"` : ''}
${category ? `category: "${category}"` : ''}
---

`;

    const fullContent = frontMatter + content;

    console.log(`[Blog] Publishing to ${filePath}`);

    await saveFileToGitHub(filePath, fullContent, `Create ${type} post: ${title}`);

    console.log(`[Blog] Successfully published ${filePath}`);
    return NextResponse.json({ success: true, slug });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    console.error('[Blog] POST error:', errorMsg, error);
    return NextResponse.json(
      { error: `Failed to publish: ${errorMsg}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { type, slug, title, excerpt, category, date, content } = await request.json();

    if (!type || !slug || !content) {
      return NextResponse.json(
        { error: 'Slug and content required' },
        { status: 400 }
      );
    }

    const dir = type === 'blog' ? 'content/posts' : 'content/newsletters';
    const filePath = `${dir}/${slug}.md`;

    const frontMatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date || new Date().toISOString()}
${excerpt ? `excerpt: "${excerpt.replace(/"/g, '\\"')}"` : ''}
${category ? `category: "${category}"` : ''}
---

`;

    const fullContent = frontMatter + content;
    const fileData = await getFileFromGitHub(filePath);

    await saveFileToGitHub(
      filePath,
      fullContent,
      `Update ${type} post: ${title}`,
      fileData?.sha
    );

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { type, slug } = await request.json();

    if (!type || !slug) {
      return NextResponse.json(
        { error: 'Type and slug required' },
        { status: 400 }
      );
    }

    const dir = type === 'blog' ? 'content/posts' : 'content/newsletters';
    const filePath = `${dir}/${slug}.md`;

    await deleteFileFromGitHub(filePath, `Delete ${type} post`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}
