import { VercelRequest, VercelRequestCookies, VercelResponse } from '@vercel/node';
import {
    getSession
} from './services/sessions.js';

export default async function handler(
  req,
  res)
{

    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method not allowed'
        });
    }

    try {
        const cookies = parseCookies(req.headers.cookie);
        const sessionId = cookies.session;

        if (!sessionId) {
            return res.status(401).json({
                error: 'Not authenticated'
            });
        }

        const session = await getSession(sessionId);

        if (!session) {
            return res.status(401).json({
                error: 'Not authenticated'
            });
        }

        return res.status(200).json({
            email: session.email,
            name: session.name,
            picture: session.picture
        });

      req.cookies

    } catch (error) {

        console.error('Auth /me error:', error);

        return res.status(500).json({
            error: 'Authentication check failed'
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
