import type { VercelRequest, VercelResponse } from '@vercel/node';

const TELEGRAM_MESSAGE_LIMIT = 4096;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Telegram notification endpoint is active' });
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  if (req.headers['sec-key'] !== process.env['TELEGRAM_SECRET_KEY']) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const message = req.body?.message;

  if (typeof message !== 'string' || !message.trim() || message.length > TELEGRAM_MESSAGE_LIMIT) {
    res.status(400).json({ message: 'A notification message of up to 4096 characters is required' });
    return;
  }

  const token = process.env['TELEGRAM_BOT_TOKEN'];
  const chatId = process.env['TELEGRAM_ADMIN_CHAT'];

  if (!token || !chatId) {
    console.error('Telegram notification environment variables are missing');
    res.status(500).json({ message: 'Notification service is not configured' });
    return;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message.trim(),
        disable_web_page_preview: true
      })
    });

    if (!response.ok) {
      console.error('Telegram API rejected notification:', response.status, await response.text());
      res.status(502).json({ message: 'Unable to deliver notification' });
      return;
    }

    res.status(204).end();
  } catch (error) {
    console.error('Telegram notification failed:', error);
    res.status(502).json({ message: 'Unable to deliver notification' });
  }
}
