import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslationService, type SupportedLanguage } from '../services/translation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  protected readonly translationService = inject(TranslationService);

  protected readonly languages: SupportedLanguage[] = ['en', 'et', 'ru'];

  protected get currentLanguage(): SupportedLanguage {
    return this.translationService.currentLanguage();
  }

  protected get isMenuOpen(): boolean {
    return this.translationService.isMenuOpen();
  }

  protected getFlag(language: SupportedLanguage): string {
    return this.translationService.getFlag(language);
  }

  protected t(key: string): string {
    return this.translationService.translate(key);
  }

  protected selectLanguage(language: SupportedLanguage): void {
    this.translationService.setLanguage(language);
  }

  protected toggleMenu(): void {
    this.translationService.toggleMenu();
  }
}
