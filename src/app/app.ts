import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslationService, type SupportedLanguage} from './services/translation.service';
import { CommonModule } from '@angular/common';
import { ToolbarBottom } from "./control/toolbar-bottom/toolbar-bottom";
import { BrandLogo } from "./control/brand-logo/brand-logo";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgIconsModule, FontAwesomeModule, CommonModule, ToolbarBottom, BrandLogo],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kliimanova');

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
