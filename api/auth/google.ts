import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'node:crypto';

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  const clientId = process.env['GOOGLE_CLIENT_ID'];

  if (!clientId) {
    return res.status(500).json({
      error: 'GOOGLE_CLIENT_ID is not configured'
    });
  }

  const state = crypto.randomBytes(32).toString('hex');

  const redirectUri =
    `${getBaseUrl(req)}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    prompt: 'select_account'
  });

  res.setHeader(
    'Set-Cookie',
    `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api/auth; Max-Age=600`
  );

  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
  );
}

function getBaseUrl(req: VercelRequest): string {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;

  return `${proto}://${host}`;
}
