const TELEGRAM_MESSAGE_LIMIT = 4096;

export class TelegramService {

  static async sendNotification(message: string): Promise<void> {
    const token = process.env['TELEGRAM_BOT_TOKEN'];
    const chatId = process.env['TELEGRAM_ADMIN_CHAT'];

    if (!token || !chatId) {
      console.error('Telegram notification environment variables are missing');
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
        return;
      }
    } catch (error) {
      console.error('Telegram notification failed:', error);
    }
  }
}
