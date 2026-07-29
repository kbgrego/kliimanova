import type { VercelRequest, VercelResponse } from '@vercel/node';

import pool from './server/services/db.js';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {

    if (req.method !== 'GET') {
        return res.status(405).json({
            success: false,
            message: 'Method Not Allowed'
        });
    }

    try {

        const {
            service_code,
            package_code
        } = req.query;

        let sql = `
            SELECT
                service_code,
                service_name,
                package_code,
                package_name,
                description,
                price,
                duration_hours,
                recommended,
                display_order
            FROM pricing
            WHERE active = true
        `;

        const params = [];

        if (service_code) {
            params.push(service_code);
            sql += ` AND service_code = $${params.length}`;
        }

        if (package_code) {
            params.push(package_code);
            sql += ` AND package_code = $${params.length}`;
        }

        sql += `
            ORDER BY
                service_code,
                display_order,
                package_name
        `;

        const result = await pool.query(sql, params);

        return res.status(200).json({
            success: true,
            count: result.rows.length,
            data: result.rows
        });

    } catch (err) {

        console.error(err);

        return res.status(500).json({
            success: false,
            message: 'Database error'
        });

    }
}
