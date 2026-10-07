import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_0NIyXRSJCuY9@ep-cool-art-b42s6xk4-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function testSubmitLead() {
  console.log('Submitting test demo request to Neon PostgreSQL...\n');
  try {
    const sql = neon(DATABASE_URL);
    const result = await sql`
      INSERT INTO leads (name, company, email, phone, solution, industry, notes, status, source)
      VALUES (
        'Rajesh Kumar',
        'Apollo Automotive Ltd',
        'rajesh.kumar@apolloauto.com',
        '+91 98765 43210',
        'Perfect Trace™ & RFID Gate Portals',
        'Automotive OEM',
        'Looking for 4-tier serialization and line integration demo.',
        'New',
        'Request Demo Modal'
      )
      RETURNING id, name, company, email, solution, created_at;
    `;

    console.log('✅ Demo Lead successfully inserted:');
    console.table(result);
  } catch (err) {
    console.error('Error submitting lead:', err);
  }
}

testSubmitLead();
