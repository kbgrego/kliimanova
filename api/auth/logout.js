import {
    deleteSession
} from './server/services/session.js';

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    try {
        const cookies = parseCookies(req.headers.cookie);
        const sessionId = cookies.session;

        if (sessionId) {
            await deleteSession(sessionId);
        }

        // Remove the session cookie
        res.setHeader(
            'Set-Cookie',
            [
                'session=',
                'HttpOnly',
                'Secure',
                'SameSite=Lax',
                'Path=/',
                'Max-Age=0'
            ].join('; ')
        );

        return res.status(204).end();

    } catch (error) {

        console.error('Auth logout error:', error);

        return res.status(500).json({
            error: 'Logout failed'
        });
    }
}

function parseCookies(cookieHeader) {

    if (!cookieHeader) {
        return {};
    }

    return cookieHeader
        .split(';')
        .reduce((cookies, cookie) => {

            const [name, ...rest] =
                cookie.trim().split('=');

            if (name) {
                cookies[name] =
                    decodeURIComponent(rest.join('='));
            }

            return cookies;

        }, {});
}
