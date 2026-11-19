import { INITIAL_INSIGHTS_POSTS } from '../data/seedInsightsPosts';
import { neon } from '@neondatabase/serverless';

const DB_URL = import.meta.env.VITE_NEON_DATABASE_URL || 
  'postgresql://neondb_owner:npg_0NIyXRSJCuY9@ep-cool-art-b42s6xk4-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const LOCAL_STORAGE_KEY = 'atpl_insights_posts_cache';

// Load stored local posts if any
const getStoredPosts = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return INITIAL_INSIGHTS_POSTS;
};

const saveStoredPosts = (posts) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {}
};

/**
 * Fetch all insights posts with search, category filtering, and status
 */
export const fetchInsightsPosts = async ({ category = 'All', search = '', status = 'published', page = 1, limit = 12 } = {}) => {
  // 1. Try Express API backend first
  try {
    const params = new URLSearchParams();
    if (category && category !== 'All') params.append('category', category);
    if (search && search.trim()) params.append('search', search.trim());
    if (status) params.append('status', status);
    params.append('page', page);
    params.append('limit', limit);

    const res = await fetch(`/api/insights?${params.toString()}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && Array.isArray(data.posts)) {
        return {
          posts: data.posts,
          pagination: data.pagination || { page, limit, total: data.posts.length, totalPages: 1 }
        };
      }
    }
  } catch (apiErr) {
    // API not reachable, proceed to direct Neon PostgreSQL / local fallback
  }

  // 2. Direct Neon PostgreSQL query fallback
  try {
    const sql = neon(DB_URL);
    const rows = await sql`
      SELECT 
        id, slug, title, category, tags, excerpt, content, author,
        cover_image AS "coverImage", published_at AS "publishedAt",
        reading_time AS "readingTime", status, views,
        seo_title AS "seoTitle", seo_description AS "seoDescription",
        og_image AS "ogImage", created_at AS "createdAt"
      FROM insights_posts
      ORDER BY published_at DESC;
    `;

    if (rows && rows.length > 0) {
      let formatted = rows.map(r => ({
        ...r,
        author: typeof r.author === 'string' ? JSON.parse(r.author) : r.author
      }));

      if (status !== 'all') {
        formatted = formatted.filter(p => p.status === status);
      }
      if (category && category !== 'All') {
        formatted = formatted.filter(p => p.category?.toLowerCase() === category.toLowerCase());
      }
      if (search && search.trim()) {
        const q = search.trim().toLowerCase();
        formatted = formatted.filter(p =>
          p.title?.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.author?.name?.toLowerCase().includes(q) ||
          p.tags?.some(t => t?.toLowerCase().includes(q))
        );
      }

      const total = formatted.length;
      const offset = (page - 1) * limit;
      const paginated = formatted.slice(offset, offset + limit);

      return {
        posts: paginated,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
      };
    }
  } catch (neonErr) {
    // Neon query warning
  }

  // 3. High-performance offline cache / seed posts fallback
  let posts = getStoredPosts();
  if (status !== 'all') {
    posts = posts.filter(p => p.status === status);
  }
  if (category && category !== 'All') {
    posts = posts.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  }
  if (search && search.trim()) {
    const q = search.trim().toLowerCase();
    posts = posts.filter(p =>
      p.title?.toLowerCase().includes(q) ||
      p.excerpt?.toLowerCase().includes(q) ||
      p.author?.name?.toLowerCase().includes(q) ||
      p.tags?.some(t => t?.toLowerCase().includes(q))
    );
  }

  const total = posts.length;
  const offset = (page - 1) * limit;
  const paginated = posts.slice(offset, offset + limit);

  return {
    posts: paginated,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
  };
};

/**
 * Fetch a single insight post by its URL slug
 */
export const fetchInsightBySlug = async (slug) => {
  // 1. Try Express API
  try {
    const res = await fetch(`/api/insights/${encodeURIComponent(slug)}`);
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.post) {
        return data.post;
      }
    }
  } catch (e) {}

  // 2. Try direct Neon PostgreSQL
  try {
    const sql = neon(DB_URL);
    const rows = await sql`
      SELECT 
        id, slug, title, category, tags, excerpt, content, author,
        cover_image AS "coverImage", published_at AS "publishedAt",
        reading_time AS "readingTime", status, views,
        seo_title AS "seoTitle", seo_description AS "seoDescription",
        og_image AS "ogImage", created_at AS "createdAt"
      FROM insights_posts
      WHERE slug = ${slug}
      LIMIT 1;
    `;
    if (rows && rows.length > 0) {
      return {
        ...rows[0],
        author: typeof rows[0].author === 'string' ? JSON.parse(rows[0].author) : rows[0].author
      };
    }
  } catch (e) {}

  // 3. Fallback to seed posts
  const posts = getStoredPosts();
  return posts.find(p => p.slug === slug) || null;
};

/**
 * Create a new insights article (Admin Protected)
 */
export const createInsightPost = async (postData, adminToken = 'admin-authenticated') => {
  // 1. Try Express API
  try {
    const res = await fetch('/api/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(postData)
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success) {
        return data.post;
      }
    }
  } catch (e) {}

  // 2. Direct Neon Fallback
  const id = postData.id || `post-${Date.now()}`;
  const slug = postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  const newPost = {
    ...postData,
    id,
    slug,
    views: 0,
    publishedAt: postData.publishedAt || new Date().toISOString()
  };

  try {
    const sql = neon(DB_URL);
    await sql`
      INSERT INTO insights_posts (
        id, slug, title, category, tags, excerpt, content, author,
        cover_image, published_at, reading_time, status, views,
        seo_title, seo_description, og_image
      ) VALUES (
        ${newPost.id}, ${newPost.slug}, ${newPost.title}, ${newPost.category},
        ${newPost.tags || []}, ${newPost.excerpt || ''}, ${newPost.content || ''},
        ${JSON.stringify(newPost.author || {})}, ${newPost.coverImage || ''},
        ${newPost.publishedAt}, ${newPost.readingTime || '5 min read'},
        ${newPost.status || 'published'}, 0,
        ${newPost.seoTitle || newPost.title}, ${newPost.seoDescription || newPost.excerpt},
        ${newPost.ogImage || newPost.coverImage}
      ) ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        content = EXCLUDED.content;
    `;
  } catch (e) {}

  // Local storage update
  const stored = getStoredPosts();
  stored.unshift(newPost);
  saveStoredPosts(stored);

  return newPost;
};

/**
 * Update an existing insight post (Admin Protected)
 */
export const updateInsightPost = async (id, updateData, adminToken = 'admin-authenticated') => {
  try {
    const res = await fetch(`/api/insights/${encodeURIComponent(id)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify(updateData)
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {}

  // Update in local cache
  const stored = getStoredPosts();
  const idx = stored.findIndex(p => p.id === id || p.slug === id);
  if (idx !== -1) {
    stored[idx] = { ...stored[idx], ...updateData };
    saveStoredPosts(stored);
    return { success: true, post: stored[idx] };
  }
  return { success: true };
};

/**
 * Delete an insight post (Admin Protected)
 */
export const deleteInsightPost = async (id, adminToken = 'admin-authenticated') => {
  try {
    const res = await fetch(`/api/insights/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    });
    if (res.ok) {
      return true;
    }
  } catch (e) {}

  const stored = getStoredPosts().filter(p => p.id !== id && p.slug !== id);
  saveStoredPosts(stored);
  return true;
};
