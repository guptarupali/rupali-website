import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
  category?: string;
  content: string;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const postsDir = path.join(process.cwd(), 'content', 'posts');
    const files = await fs.readdir(postsDir);

    const posts: BlogPost[] = await Promise.all(
      files
        .filter(file => file.endsWith('.md'))
        .map(async file => {
          const filePath = path.join(postsDir, file);
          const content = await fs.readFile(filePath, 'utf-8');
          const { data, content: body } = matter(content);

          return {
            slug: file.replace('.md', ''),
            title: data.title || file.replace('.md', ''),
            date: data.date || new Date().toISOString(),
            excerpt: data.excerpt || '',
            category: data.category || '',
            content: body,
          };
        })
    );

    // Sort by date descending
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'posts', `${slug}.md`);
    const content = await fs.readFile(filePath, 'utf-8');
    const { data, content: body } = matter(content);

    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString(),
      excerpt: data.excerpt || '',
      category: data.category || '',
      content: body,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}
