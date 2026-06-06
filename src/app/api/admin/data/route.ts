import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = 'guptarupali/rupali-website';
const GITHUB_OWNER = 'guptarupali';
const GITHUB_BRANCH = 'main';

interface DataFile {
  awards: any[];
  events: any[];
  media: any[];
  recommendations: any[];
  advisoryServices: any[];
  speakingTopics: any[];
  bio: string;
}

async function getGitHubFile(filePath: string) {
  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token not configured');
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3.raw',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const content = await response.text();
    return JSON.parse(content);
  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    return null;
  }
}

async function updateGitHubFile(
  filePath: string,
  content: any,
  message: string,
  getSha?: () => Promise<string>
) {
  if (!GITHUB_TOKEN) {
    throw new Error('GitHub token not configured');
  }

  // Get current file SHA
  let sha = '';
  try {
    if (getSha) {
      sha = await getSha();
    } else {
      const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}?ref=${GITHUB_BRANCH}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        sha = data.sha;
      }
    }
  } catch (err) {
    console.error('Error getting file SHA:', err);
  }

  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${filePath}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: `${message} via admin dashboard`,
      content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
      branch: GITHUB_BRANCH,
      ...(sha && { sha }),
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to update file: ${error}`);
  }

  return response.json();
}

export async function GET(request: NextRequest) {
  try {
    const entity = request.nextUrl.searchParams.get('entity');

    if (!entity) {
      return NextResponse.json({ error: 'Entity type required' }, { status: 400 });
    }

    const filePath = 'src/lib/admin-data.json';
    const data = await getGitHubFile(filePath);

    if (!data) {
      return NextResponse.json(
        { error: 'Data file not found' },
        { status: 404 }
      );
    }

    if (entity === 'all') {
      return NextResponse.json(data);
    }

    if (entity in data) {
      return NextResponse.json({ [entity]: data[entity] });
    }

    return NextResponse.json({ error: 'Invalid entity' }, { status: 400 });
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
    const { entity, item } = await request.json();

    if (!entity || !item) {
      return NextResponse.json(
        { error: 'Entity and item required' },
        { status: 400 }
      );
    }

    const filePath = 'src/lib/admin-data.json';
    const data = await getGitHubFile(filePath);

    if (!data) {
      return NextResponse.json(
        { error: 'Data file not found' },
        { status: 404 }
      );
    }

    if (!Array.isArray(data[entity])) {
      return NextResponse.json(
        { error: 'Invalid entity type' },
        { status: 400 }
      );
    }

    // Add ID if not present
    const newItem = {
      ...item,
      id: item.id || Date.now().toString(),
    };

    data[entity].push(newItem);

    await updateGitHubFile(filePath, data, `Add ${entity} item`);

    return NextResponse.json({ success: true, item: newItem });
  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { entity, id, item } = await request.json();

    if (!entity || !id || !item) {
      return NextResponse.json(
        { error: 'Entity, id, and item required' },
        { status: 400 }
      );
    }

    const filePath = 'src/lib/admin-data.json';
    const data = await getGitHubFile(filePath);

    if (!data || !Array.isArray(data[entity])) {
      return NextResponse.json(
        { error: 'Invalid entity' },
        { status: 400 }
      );
    }

    const index = data[entity].findIndex((i: any) => i.id === id);
    if (index === -1) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    data[entity][index] = { ...data[entity][index], ...item, id };

    await updateGitHubFile(filePath, data, `Update ${entity} item`);

    return NextResponse.json({ success: true, item: data[entity][index] });
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
    const { entity, id } = await request.json();

    if (!entity || !id) {
      return NextResponse.json(
        { error: 'Entity and id required' },
        { status: 400 }
      );
    }

    const filePath = 'src/lib/admin-data.json';
    const data = await getGitHubFile(filePath);

    if (!data || !Array.isArray(data[entity])) {
      return NextResponse.json(
        { error: 'Invalid entity' },
        { status: 400 }
      );
    }

    data[entity] = data[entity].filter((i: any) => i.id !== id);

    await updateGitHubFile(filePath, data, `Delete ${entity} item`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}
