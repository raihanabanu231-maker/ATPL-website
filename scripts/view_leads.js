import { neon } from '@neondatabase/serverless';

const DATABASE_URL = 'postgresql://neondb_owner:npg_0NIyXRSJCuY9@ep-cool-art-b42s6xk4-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

async function viewLeads() {
  console.log('Fetching demo form leads from Neon PostgreSQL...\n');
  try {
    const sql = neon(DATABASE_URL);
    const leads = await sql`
      SELECT id, name, company, email, phone, solution, status, created_at 
      FROM leads 
      ORDER BY created_at DESC 
      LIMIT 20;
    `;

    if (leads.length === 0) {
      console.log('No leads submitted yet. Ready to receive demo submissions!');
    } else {
      console.table(leads);
    }
  } catch (err) {
    console.error('Error fetching leads:', err);
  }
}

viewLeads();
