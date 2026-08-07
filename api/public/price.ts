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
                p.service_code,
                p.service_name,
                p.package_code,
                p.package_name,
                p.description,
                p.price,
                p.duration_hours,
                p.recommended,
                p.display_order,

                array_agg(ps.service_description ORDER BY ps.service_order) AS services

            FROM pricing p

            LEFT JOIN pricing_services ps
                ON ps.service_code = p.service_code
              AND ps.package_code = p.package_code

            WHERE p.active = true
        `;

        const params = [];

        if (service_code) {
            params.push(service_code);
            sql += ` AND p.service_code = $${params.length}`;
        }

        if (package_code) {
            params.push(package_code);
            sql += ` AND p.package_code = $${params.length}`;
        }

        sql += `
            GROUP BY
                p.service_code,
                p.service_name,
                p.package_code,
                p.package_name,
                p.description,
                p.price,
                p.duration_hours,
                p.recommended,
                p.display_order

            ORDER BY
                p.service_code,
                p.display_order,
                p.package_name
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
