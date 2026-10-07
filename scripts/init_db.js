import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_0NIyXRSJCuY9@ep-cool-art-b42s6xk4-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function initDB() {
  console.log('Connecting to Neon PostgreSQL database...');
  try {
    const sql = neon(DATABASE_URL);

    // 1. Create Leads Table
    console.log('Creating table: leads...');
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        solution VARCHAR(255),
        industry VARCHAR(100),
        notes TEXT,
        status VARCHAR(50) DEFAULT 'New',
        source VARCHAR(100) DEFAULT 'Website Modal',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 2. Create Newsletter Subscribers Table
    console.log('Creating table: newsletter_subscribers...');
    await sql`
      CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // 3. Create Audit / Inquiry Logs Table
    console.log('Creating table: inquiries...');
    await sql`
      CREATE TABLE IF NOT EXISTS inquiries (
        id SERIAL PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        subject VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const version = await sql`SELECT version();`;
    console.log('✅ Connected successfully to Neon PostgreSQL!');
    console.log('Database version:', version[0].version);
    console.log('✅ Tables created: leads, newsletter_subscribers, inquiries');
  } catch (err) {
    console.error('❌ Neon DB Connection Error:', err);
  }
}

initDB();
