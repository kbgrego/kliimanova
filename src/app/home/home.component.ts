import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { SettingsService } from '../core/settings/settings.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  protected readonly translationService = inject(TranslationService);
  private readonly settingsService = inject(SettingsService);

  protected readonly settings = this.settingsService.settings;

  protected t(key: string): string {
    return this.translationService.translate(key);
  }
}
