import crypto from 'node:crypto';
import pool from '../../public/server/services/db.js';

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7; // 7 days

export async function createSession(adminUserId: string) {

    const sessionId = crypto.randomUUID();

    const result = await pool.query(
        `
        INSERT INTO admin_sessions (
            id,
            admin_user_id,
            expires_at
        )
        VALUES (
            $1,
            $2,
            NOW() + INTERVAL '7 days'
        )
        RETURNING
            id,
            admin_user_id,
            expires_at
        `,
        [sessionId, adminUserId]
    );

    return result.rows[0];
}

export async function getSession(sessionId: string) {

    const result = await pool.query(
        `
        SELECT
            s.id,
            s.admin_user_id,
            s.expires_at,
            u.email,
            u.name,
            u.picture,
            u.active
        FROM admin_sessions s
        JOIN admin_users u
            ON u.id = s.admin_user_id
        WHERE s.id = $1
          AND s.expires_at > NOW()
          AND u.active = TRUE
        `,
        [sessionId]
    );

    return result.rows[0] ?? null;
}

export async function deleteSession(sessionId: string) {

    await pool.query(
        `
        DELETE FROM admin_sessions
        WHERE id = $1
        `,
        [sessionId]
    );
}

export {
    SESSION_DURATION_SECONDS
};
