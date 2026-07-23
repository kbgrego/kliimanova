import {
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
  signal
} from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIconsModule } from '@ng-icons/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslationService, type SupportedLanguage} from './services/translation.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToolbarBottom } from "./control/toolbar-bottom/toolbar-bottom";
import { BrandLogo } from "./control/brand-logo/brand-logo";
import { SettingsService } from './core/settings/settings.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NgIconsModule,
    FontAwesomeModule,
    CommonModule,
    ToolbarBottom,
    BrandLogo
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kliimanova');
  protected readonly isNavigationOpen = signal(false);

  protected readonly translationService = inject(TranslationService);
  protected readonly settingsService = inject(SettingsService);

  private readonly platformId = inject(PLATFORM_ID);
  protected readonly languages: SupportedLanguage[] = ['en', 'et', 'ru'];

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      void this.settingsService.load();
    }
  }

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

  protected toggleNavigation(): void {
    this.isNavigationOpen.update((isOpen) => !isOpen);
  }

  protected closeNavigation(): void {
    this.isNavigationOpen.set(false);
  }
}
