import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

interface TelegramNotificationRequest {
  message: string;
}

/** Sends notifications through the server-side Telegram endpoint. */
@Injectable({ providedIn: 'root' })
export class TelegramService {
  private readonly http = inject(HttpClient);

  sendNotification(message: string): Promise<void> {
    return firstValueFrom(
      this.http.post<void>('/api/telegram', { message } satisfies TelegramNotificationRequest)
    );
  }
}
