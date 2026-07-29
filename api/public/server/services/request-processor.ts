import { RequestEntry, ProcessResult } from '../models/request.model.js';
import { TelegramService } from './telegram.js';

export class RequestProcessor {
  private category: string;

  constructor(category: string = 'General') {
    this.category = category;
  }

  public async process(data: RequestEntry): Promise<ProcessResult> {
    // 1. Enforce business rules or additional processing
    this.logIncoming(data);

    // 2. Perform actions (e.g., store in database, trigger notification)
    const id = await this.saveToDatabase(data);

    const telRsult = await TelegramService.sendNotification(
      'New consultation request' +
      'Request: ' + this.escapeMarkdown(data.Name) +
      'Service: ' + this.escapeMarkdown(data.Service) +
      'Contact: ' + this.escapeMarkdown(data.ContactName) +
      'Email: ' + this.escapeMarkdown(data.Email) +
      'Address: ' + this.escapeMarkdown(data.Address)
    );

    if (telRsult) {
      return {
        requestId: id,
        status: 'PROCESSED',
        timestamp: new Date().toISOString(),
      };
    } else {
      return {
        requestId: id,
        status: 'FAILED',
        timestamp: new Date().toISOString(),
      }
    }
  }

  private logIncoming(data: RequestEntry): void {
    console.log(`[${this.category}] Processing request for ${data.Email}`);
  }

  private async saveToDatabase(data: RequestEntry): Promise<string> {
    // DB interaction logic goes here
    return `REQ-${Date.now()}`;
  }

  private escapeMarkdown(text: string): string {
    return text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&');
  }
}
