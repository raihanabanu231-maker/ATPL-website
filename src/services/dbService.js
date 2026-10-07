import { neon } from '@neondatabase/serverless';

const DB_URL = import.meta.env.VITE_NEON_DATABASE_URL || 'postgresql://neondb_owner:npg_0NIyXRSJCuY9@ep-cool-art-b42s6xk4-pooler.c-6.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

/**
 * Save new lead into Neon PostgreSQL database
 */
export const saveLeadToDatabase = async (leadData) => {
  try {
    const sql = neon(DB_URL);
    const result = await sql`
      INSERT INTO leads (name, company, email, phone, solution, industry, notes, status, source)
      VALUES (
        ${leadData.name || 'Anonymous'},
        ${leadData.company || ''},
        ${leadData.email || ''},
        ${leadData.phone || ''},
        ${leadData.solution || ''},
        ${leadData.industry || ''},
        ${leadData.notes || ''},
        'New',
        ${leadData.source || 'Website Modal'}
      )
      RETURNING id, created_at;
    `;
    console.log('✅ Lead saved to Neon PostgreSQL database:', result[0]);
    return { success: true, id: result[0]?.id };
  } catch (err) {
    console.warn('⚠️ Cloud DB sync fallback to local cache:', err?.message || err);
    return { success: false, error: err?.message };
  }
};

/**
 * Save contact inquiry into Neon PostgreSQL database
 */
export const saveInquiryToDatabase = async (inquiryData) => {
  try {
    const sql = neon(DB_URL);
    const result = await sql`
      INSERT INTO inquiries (full_name, email, phone, subject, message)
      VALUES (
        ${inquiryData.fullName || inquiryData.name || ''},
        ${inquiryData.email || ''},
        ${inquiryData.phone || ''},
        ${inquiryData.subject || ''},
        ${inquiryData.message || ''}
      )
      RETURNING id, created_at;
    `;
    console.log('✅ Inquiry saved to Neon PostgreSQL database:', result[0]);
    return { success: true, id: result[0]?.id };
  } catch (err) {
    console.warn('⚠️ Cloud DB sync fallback:', err?.message || err);
    return { success: false, error: err?.message };
  }
};

/**
 * Subscribe email to newsletter in Neon PostgreSQL database
 */
export const subscribeNewsletter = async (email) => {
  try {
    const sql = neon(DB_URL);
    const result = await sql`
      INSERT INTO newsletter_subscribers (email)
      VALUES (${email.trim().toLowerCase()})
      ON CONFLICT (email) DO NOTHING
      RETURNING id;
    `;
    console.log('✅ Newsletter subscription stored in PostgreSQL:', email);
    return { success: true };
  } catch (err) {
    console.warn('⚠️ Newsletter sync fallback:', err?.message || err);
    return { success: false, error: err?.message };
  }
};
