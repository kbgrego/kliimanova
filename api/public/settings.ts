import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const databaseUrl = process.env['DATABASE_URL'];

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not configured');
}

const sql = neon(databaseUrl);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const rows = await sql`
      SELECT property, value
      FROM settings
      WHERE is_public = TRUE
      ORDER BY property
    `;

    const rawSettings = Object.fromEntries(
      rows.map(row => [
        String(row['property']),
        String(row['value'])
      ])
    );

    return res.status(200).json({
      ...rawSettings,
      social_links: rawSettings['social_links']
        ? JSON.parse(rawSettings['social_links'])
        : {}
    });
  } catch (error) {
    console.error('Unable to load settings:', error);

    return res.status(500).json({
      message: 'Unable to load public settings'
    });
  }
}
