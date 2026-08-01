import {
  Component,
  DestroyRef,
  ElementRef,
  OnInit,
  PLATFORM_ID,
  QueryList,
  ViewChild,
  ViewChildren,
  afterNextRender,
  inject,
  signal
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgIconsModule } from '@ng-icons/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslationService, type SupportedLanguage} from './services/translation.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ToolbarBottom } from "./control/toolbar-bottom/toolbar-bottom";
import { BrandLogo } from "./control/brand-logo/brand-logo";
import { SettingsService } from './core/settings/settings.service';
import { LanguageSelec } from "./control/language-selec/language-selec";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
    BrandLogo,
    LanguageSelec
],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('kliimanova');
  protected readonly isNavigationOpen = signal(false);

  protected readonly translationService = inject(TranslationService);
  protected readonly settingsService = inject(SettingsService);

  private readonly destroyRef = inject(DestroyRef);

  private readonly platformId = inject(PLATFORM_ID);

  pageName = '';

  @ViewChildren('navItem')
  navItems!: QueryList<ElementRef<HTMLAnchorElement>>;

  @ViewChild('navIndicator')
  navIndicator!: ElementRef<HTMLElement>;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd),
            takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        let current = this.route;

        while (current.firstChild) {
          current = current.firstChild;
        }

        this.pageName = current.snapshot.data['pageName'];

        requestAnimationFrame(() => this.moveIndicator());
      });

    setTimeout(() => this.moveIndicator());

    afterNextRender(() => {
      this.moveIndicator();
    });
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      void this.settingsService.load();
    }
  }

  moveIndicator() {
    const indicator = this.navIndicator?.nativeElement;

    const active = this.navItems.find(item =>
      item.nativeElement.classList.contains('active')
    );

    if (!indicator || !active) {
      return;
    }

    indicator.style.width = active.nativeElement.offsetWidth + 'px';
    indicator.style.left = active.nativeElement.offsetLeft + 'px';
  }

  protected t(key: string): string {
    return this.translationService.translate(key);
  }

  protected toggleNavigation(): void {
    this.isNavigationOpen.update((isOpen) => !isOpen);
  }

  protected closeNavigation(): void {
    this.isNavigationOpen.set(false);
  }
}
