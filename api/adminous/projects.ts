// api/admin/projects.ts

export default async function handler(req: any, res: any) {
  const admin =  false; // await requireAdmin(req); // Verify an HttpOnly session cookie or JWT.

  if (!admin) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const page = Math.max(Number(req.query['page'] ?? 1), 1);
  const limit = Math.min(Math.max(Number(req.query['limit'] ?? 20), 1), 100);
  const offset = (page - 1) * limit;

  /*
  const projects = await sql`
    SELECT
      id,
      ticket_number,
      service_desk_uuid,
      stage_id,
      contact_name,
      address,
      email,
      telephone_number,
      description,
      created_at
    FROM projects
    ORDER BY created_at DESC
    LIMIT ${limit}
    OFFSET ${offset}
  `;


  const totalRows = await sql`SELECT COUNT(*)::int AS total FROM projects`;

  return res.status(200).json({
    projects,
    total: totalRows[0]['total']
  });
  */
  return res.status(500).json({ message: 'Unkonwn' });
}
