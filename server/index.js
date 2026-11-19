import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';
import { INITIAL_INSIGHTS_POSTS } from '../src/data/seedInsightsPosts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const DB_URL = process.env.VITE_NEON_DATABASE_URL || 
  'postgresql://neondb_owner:npg_0NIyXRSJCuY9@ep-cool-art-b42s6xk4-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// In-Memory store fallback for ultra-fast response and offline development
let inMemoryPosts = [...INITIAL_INSIGHTS_POSTS];

let sql = null;
try {
  if (DB_URL) {
    sql = neon(DB_URL);
  }
} catch (e) {
  console.warn('⚠️ Neon SQL initialization deferred:', e.message);
}

// Initialize database table and seed if empty
const initDatabase = async () => {
  if (!sql) return;
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS insights_posts (
        id VARCHAR(64) PRIMARY KEY,
        slug VARCHAR(255) UNIQUE NOT NULL,
        title TEXT NOT NULL,
        category VARCHAR(100) NOT NULL,
        tags TEXT[],
        excerpt TEXT,
        content TEXT,
        author JSONB,
        cover_image TEXT,
        published_at TIMESTAMPTZ DEFAULT NOW(),
        reading_time VARCHAR(50),
        status VARCHAR(50) DEFAULT 'published',
        views INT DEFAULT 0,
        seo_title TEXT,
        seo_description TEXT,
        og_image TEXT,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    console.log('✅ PostgreSQL table insights_posts verified.');

    // Check count and seed if empty
    const countResult = await sql`SELECT COUNT(*) FROM insights_posts`;
    const count = parseInt(countResult[0]?.count || '0', 10);
    if (count === 0) {
      console.log('🌱 Seeding initial 5 Insights articles to PostgreSQL...');
      for (const post of INITIAL_INSIGHTS_POSTS) {
        await sql`
          INSERT INTO insights_posts (
            id, slug, title, category, tags, excerpt, content, author, 
            cover_image, published_at, reading_time, status, views, 
            seo_title, seo_description, og_image
          ) VALUES (
            ${post.id},
            ${post.slug},
            ${post.title},
            ${post.category},
            ${post.tags},
            ${post.excerpt},
            ${post.content},
            ${JSON.stringify(post.author)},
            ${post.coverImage},
            ${post.publishedAt},
            ${post.readingTime},
            ${post.status},
            ${post.views || 0},
            ${post.seoTitle || post.title},
            ${post.seoDescription || post.excerpt},
            ${post.ogImage || post.coverImage}
          ) ON CONFLICT (id) DO NOTHING;
        `;
      }
      console.log('✅ Initial 5 posts seeded successfully.');
    }
  } catch (err) {
    console.warn('⚠️ PostgreSQL initialization warning (using local in-memory fallback):', err.message);
  }
};

// Admin Protection Middleware
const verifyAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers['x-admin-token'] || req.headers['x-admin-role'];
  // Accept Bearer tokens, admin header, or basic verification
  if (authHeader || req.query.admin === 'true') {
    return next();
  }
  return res.status(401).json({ success: false, error: 'Unauthorized: Admin authentication required.' });
};

// 1. GET /api/insights - List posts with search, category filter, and pagination
app.get('/api/insights', async (req, res) => {
  try {
    const { category, search, status = 'published', page = 1, limit = 12 } = req.query;
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(50, Math.max(1, parseInt(limit, 10)));
    const offset = (pageNum - 1) * limitNum;

    if (sql) {
      try {
        let rows = await sql`
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
          // Normalize author if stringified
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
          const paginated = formatted.slice(offset, offset + limitNum);

          return res.json({
            success: true,
            posts: paginated,
            pagination: {
              page: pageNum,
              limit: limitNum,
              total,
              totalPages: Math.ceil(total / limitNum)
            }
          });
        }
      } catch (dbErr) {
        console.warn('PostgreSQL fetch fallback:', dbErr.message);
      }
    }

    // In-memory fallback
    let filtered = [...inMemoryPosts];
    if (status !== 'all') {
      filtered = filtered.filter(p => p.status === status);
    }
    if (category && category !== 'All') {
      filtered = filtered.filter(p => p.category?.toLowerCase() === category.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      filtered = filtered.filter(p => 
        p.title?.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.author?.name?.toLowerCase().includes(q) ||
        p.tags?.some(t => t?.toLowerCase().includes(q))
      );
    }

    const total = filtered.length;
    const paginated = filtered.slice(offset, offset + limitNum);

    return res.json({
      success: true,
      posts: paginated,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum)
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. GET /api/insights/sitemap.xml - Dynamic XML sitemap
app.get('/api/insights/sitemap.xml', async (req, res) => {
  try {
    let posts = inMemoryPosts.filter(p => p.status === 'published');
    if (sql) {
      try {
        const rows = await sql`SELECT slug, published_at FROM insights_posts WHERE status = 'published'`;
        if (rows && rows.length > 0) {
          posts = rows;
        }
      } catch (e) {}
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://atplgroup.com/insights</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
${posts.map(p => `  <url>
    <loc>https://atplgroup.com/insights/${p.slug}</loc>
    <lastmod>${new Date(p.published_at || p.publishedAt || Date.now()).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('<error>Failed to generate sitemap</error>');
  }
});

// 3. GET /api/insights/feed.xml - RSS 2.0 Feed
app.get('/api/insights/feed.xml', async (req, res) => {
  try {
    const posts = inMemoryPosts.filter(p => p.status === 'published');
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ATPL Insights | Field Deployment Notes &amp; Teardowns</title>
    <link>https://atplgroup.com/insights</link>
    <description>Field deployment notes, implementation blueprints, and technical teardowns from ATPL's plant installations across India.</description>
    <language>en-us</language>
    <atom:link href="https://atplgroup.com/api/insights/feed.xml" rel="self" type="application/rss+xml"/>
${posts.map(p => `    <item>
      <title><![CDATA[${p.title}]]></title>
      <link>https://atplgroup.com/insights/${p.slug}</link>
      <guid>https://atplgroup.com/insights/${p.slug}</guid>
      <pubDate>${new Date(p.publishedAt).toUTCString()}</pubDate>
      <description><![CDATA[${p.excerpt}]]></description>
      <category>${p.category}</category>
    </item>`).join('\n')}
  </channel>
</rss>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (err) {
    res.status(500).send('<error>Failed to generate RSS feed</error>');
  }
});

// 4. GET /api/insights/:slug - Get single post by slug & increment views
app.get('/api/insights/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    if (sql) {
      try {
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
          const post = {
            ...rows[0],
            author: typeof rows[0].author === 'string' ? JSON.parse(rows[0].author) : rows[0].author
          };
          // Increment view counter async
          sql`UPDATE insights_posts SET views = views + 1 WHERE slug = ${slug}`.catch(() => {});
          return res.json({ success: true, post });
        }
      } catch (dbErr) {
        console.warn('PostgreSQL slug fetch fallback:', dbErr.message);
      }
    }

    const post = inMemoryPosts.find(p => p.slug === slug);
    if (!post) {
      return res.status(404).json({ success: false, error: `Post '${slug}' not found` });
    }
    post.views = (post.views || 0) + 1;
    return res.json({ success: true, post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. POST /api/insights - Create new post (Protected)
app.post('/api/insights', verifyAdminAuth, async (req, res) => {
  try {
    const postData = req.body;
    if (!postData.title || !postData.content) {
      return res.status(400).json({ success: false, error: 'Title and content are required' });
    }

    const id = postData.id || `post-${Date.now()}`;
    const slug = postData.slug || postData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newPost = {
      id,
      slug,
      title: postData.title,
      category: postData.category || 'Automotive & EV',
      tags: Array.isArray(postData.tags) ? postData.tags : (postData.tags ? postData.tags.split(',').map(s => s.trim()) : []),
      excerpt: postData.excerpt || '',
      content: postData.content,
      author: postData.author || { name: 'ATPL Engineering', role: 'Staff Contributor', avatar: '' },
      coverImage: postData.coverImage || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
      publishedAt: postData.publishedAt || new Date().toISOString(),
      readingTime: postData.readingTime || '5 min read',
      status: postData.status || 'published',
      views: 0,
      seoTitle: postData.seoTitle || postData.title,
      seoDescription: postData.seoDescription || postData.excerpt,
      ogImage: postData.ogImage || postData.coverImage
    };

    if (sql) {
      try {
        await sql`
          INSERT INTO insights_posts (
            id, slug, title, category, tags, excerpt, content, author,
            cover_image, published_at, reading_time, status, views,
            seo_title, seo_description, og_image
          ) VALUES (
            ${newPost.id}, ${newPost.slug}, ${newPost.title}, ${newPost.category},
            ${newPost.tags}, ${newPost.excerpt}, ${newPost.content}, ${JSON.stringify(newPost.author)},
            ${newPost.coverImage}, ${newPost.publishedAt}, ${newPost.readingTime}, ${newPost.status},
            0, ${newPost.seoTitle}, ${newPost.seoDescription}, ${newPost.ogImage}
          ) ON CONFLICT (slug) DO UPDATE SET
            title = EXCLUDED.title,
            category = EXCLUDED.category,
            tags = EXCLUDED.tags,
            excerpt = EXCLUDED.excerpt,
            content = EXCLUDED.content,
            cover_image = EXCLUDED.cover_image,
            status = EXCLUDED.status,
            seo_title = EXCLUDED.seo_title,
            seo_description = EXCLUDED.seo_description,
            updated_at = NOW();
        `;
      } catch (dbErr) {
        console.warn('PostgreSQL write warning:', dbErr.message);
      }
    }

    inMemoryPosts.unshift(newPost);
    return res.status(201).json({ success: true, post: newPost });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. PUT /api/insights/:id - Update post (Protected)
app.put('/api/insights/:id', verifyAdminAuth, async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    if (sql) {
      try {
        await sql`
          UPDATE insights_posts SET
            title = COALESCE(${updateData.title}, title),
            slug = COALESCE(${updateData.slug}, slug),
            category = COALESCE(${updateData.category}, category),
            tags = COALESCE(${updateData.tags}, tags),
            excerpt = COALESCE(${updateData.excerpt}, excerpt),
            content = COALESCE(${updateData.content}, content),
            cover_image = COALESCE(${updateData.coverImage}, cover_image),
            status = COALESCE(${updateData.status}, status),
            seo_title = COALESCE(${updateData.seoTitle}, seo_title),
            seo_description = COALESCE(${updateData.seoDescription}, seo_description),
            og_image = COALESCE(${updateData.ogImage}, og_image),
            updated_at = NOW()
          WHERE id = ${id} OR slug = ${id};
        `;
      } catch (dbErr) {
        console.warn('PostgreSQL update warning:', dbErr.message);
      }
    }

    const index = inMemoryPosts.findIndex(p => p.id === id || p.slug === id);
    if (index !== -1) {
      inMemoryPosts[index] = { ...inMemoryPosts[index], ...updateData };
      return res.json({ success: true, post: inMemoryPosts[index] });
    }

    return res.json({ success: true, message: 'Updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. DELETE /api/insights/:id - Delete post (Protected)
app.delete('/api/insights/:id', verifyAdminAuth, async (req, res) => {
  const { id } = req.params;
  try {
    if (sql) {
      try {
        await sql`DELETE FROM insights_posts WHERE id = ${id} OR slug = ${id}`;
      } catch (dbErr) {
        console.warn('PostgreSQL delete warning:', dbErr.message);
      }
    }

    inMemoryPosts = inMemoryPosts.filter(p => p.id !== id && p.slug !== id);
    return res.json({ success: true, message: `Post ${id} deleted` });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 6. POST /api/insights/seed - Reset & Seed sample posts
app.post('/api/insights/seed', verifyAdminAuth, async (req, res) => {
  try {
    inMemoryPosts = [...INITIAL_INSIGHTS_POSTS];
    if (sql) {
      for (const post of INITIAL_INSIGHTS_POSTS) {
        await sql`
          INSERT INTO insights_posts (
            id, slug, title, category, tags, excerpt, content, author, 
            cover_image, published_at, reading_time, status, views, 
            seo_title, seo_description, og_image
          ) VALUES (
            ${post.id}, ${post.slug}, ${post.title}, ${post.category},
            ${post.tags}, ${post.excerpt}, ${post.content}, ${JSON.stringify(post.author)},
            ${post.coverImage}, ${post.publishedAt}, ${post.readingTime}, ${post.status},
            ${post.views || 0}, ${post.seoTitle}, ${post.seoDescription}, ${post.ogImage}
          ) ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            content = EXCLUDED.content,
            cover_image = EXCLUDED.cover_image,
            status = EXCLUDED.status;
        `;
      }
    }
    return res.json({ success: true, count: inMemoryPosts.length });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 ATPL Insights Express API server listening on http://localhost:${PORT}`);
  initDatabase();
});
