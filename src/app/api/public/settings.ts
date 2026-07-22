import type { VercelRequest, VercelResponse } from '@vercel/node';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

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
      rows.map((row) => [row.property as string, row.value as string])
    );

    const settings = {
      ...rawSettings,
      social_links: rawSettings['social_links']
        ? JSON.parse(rawSettings['social_links'])
        : {}
    };

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=300, stale-while-revalidate=60'
    );

    return res.status(200).json(settings);
  } catch (error) {
    console.error('Unable to load public settings:', error);
    return res.status(500).json({
      message: 'Unable to load public settings'
    });
  }
}
