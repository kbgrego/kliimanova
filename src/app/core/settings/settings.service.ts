import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  DEFAULT_PUBLIC_SETTINGS,
  PublicSettings
} from './public-settings';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly http = inject(HttpClient);

  readonly settings = signal<PublicSettings>(DEFAULT_PUBLIC_SETTINGS);

  async load(): Promise<void> {
    const apiSettings = await firstValueFrom(
      this.http.get<Partial<PublicSettings>>('/api/public/settings')
    );

    this.settings.update(current => ({
      ...current,
      ...apiSettings,
      social_links: {
        ...current.social_links,
        ...apiSettings.social_links
      }
    }));
  }
}
