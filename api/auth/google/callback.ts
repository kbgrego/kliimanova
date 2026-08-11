import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  const { code, state, error } = req.query;

  // User cancelled Google login
  if (error) {
    return res.redirect('/admin/login?error=google_cancelled');
  }

  if (typeof code !== 'string' || typeof state !== 'string') {
    return res.status(400).json({
      error: 'Missing authorization code or state'
    });
  }

  const cookies = parseCookies(req.headers.cookie);

  const storedState = cookies.oauth_state;

  if (!storedState || storedState !== state) {
    return res.status(400).json({
      error: 'Invalid OAuth state'
    });
  }

  const clientId = process.env['GOOGLE_CLIENT_ID'];
  const clientSecret = process.env['GOOGLE_CLIENT_SECRET'];

  if (!clientId || !clientSecret) {
    return res.status(500).json({
      error: 'Google OAuth environment variables are not configured'
    });
  }

  const redirectUri =
    `${getBaseUrl(req)}/api/auth/google/callback`;

  /*
   * Exchange Google's authorization code
   * for tokens.
   */
  const tokenResponse = await fetch(
    'https://oauth2.googleapis.com/token',
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },

      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code'
      })
    }
  );

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();

    console.error(
      'Google token exchange failed:',
      errorText
    );

    return res.status(401).json({
      error: 'Google authentication failed'
    });
  }

  const tokens = await tokenResponse.json();

  /*
   * At this point Google has authenticated the user.
   *
   * We will validate the ID token and check whether
   * this Google account is allowed to access the
   * administration console.
   */
  console.log('Google authentication successful');

  // Temporary for testing.
  // We will replace this with proper session creation.
  return res.redirect('/admin');
}

function parseCookies(
  cookieHeader?: string
): Record<string, string> {
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader
    .split(';')
    .reduce<Record<string, string>>((cookies, cookie) => {
      const [name, ...rest] = cookie.trim().split('=');

      if (name) {
        cookies[name] = decodeURIComponent(rest.join('='));
      }

      return cookies;
    }, {});
}

function getBaseUrl(req: VercelRequest): string {
  const proto =
    req.headers['x-forwarded-proto'] || 'https';

  const host =
    req.headers['x-forwarded-host'] || req.headers.host;

  return `${proto}://${host}`;
}
