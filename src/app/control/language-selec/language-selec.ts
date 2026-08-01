import { Component, inject, signal } from '@angular/core';
import { SupportedLanguage, TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-language-selec',
  imports: [],
  templateUrl: './language-selec.html',
  styleUrl: './language-selec.css',
})
export class LanguageSelec {
  protected readonly languages: SupportedLanguage[] = ['en', 'et', 'ru'];

  protected readonly translationService = inject(TranslationService);

  protected get currentLanguage(): SupportedLanguage {
    return this.translationService.currentLanguage();
  }

  protected get isMenuOpen(): boolean {
    return this.translationService.isMenuOpen();
  }

  protected getFlag(language: SupportedLanguage): string {
    return this.translationService.getFlag(language);
  }

  protected selectLanguage(language: SupportedLanguage): void {
    this.translationService.setLanguage(language);
  }

  protected toggleMenu(): void {
    this.translationService.toggleMenu();
  }

  protected t(key: string): string {
    return this.translationService.translate(key);
  }
}
