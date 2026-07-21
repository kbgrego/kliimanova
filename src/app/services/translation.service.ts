import { Injectable, signal } from '@angular/core';

export type SupportedLanguage = 'en' | 'et' | 'ru';

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private readonly translations: Record<SupportedLanguage, Record<string, string>> = {
    en: {
      'hero.title': 'COMFORT',
      'hero.titleHighlight': 'STARTS HERE',
      'hero.subtitle': 'Premium heating, cooling and ventilation solutions for your home and business.',
      'hero.services.cooling': 'Cooling',
      'hero.services.heating': 'Heating',
      'hero.services.heatPumps': 'Heat Pumps',
      'hero.cta.consultation': 'GET FREE CONSULTATION',
      'hero.cta.projects': 'VIEW PROJECTS',
      'brand.tag': 'heating • cooling • heat pumps',
      'language.label': 'Select language',
      'language.en': 'English',
      'language.et': 'Estonia',
      'language.ru': 'Russian'
    },
    et: {
      'hero.title': 'MUGAVUS',
      'hero.titleHighlight': 'ALGAB SIIT',
      'hero.subtitle': 'Kvaliteetsed küttelahendused, jahutussüsteemid ja ventilatsioon teie kodu ja ettevõtte jaoks.',
      'hero.services.cooling': 'Jahutus',
      'hero.services.heating': 'Küte',
      'hero.services.heatPumps': 'Soojuspumbad',
      'hero.cta.consultation': 'SAA TASUTA KONSULTATSIOON',
      'hero.cta.projects': 'VAATA PROJEKTE',
      'brand.tag': 'küte • jahutus • soojuspumbad',
      'language.label': 'Vali keel',
      'language.en': 'Inglise',
      'language.et': 'Eesti',
      'language.ru': 'Vene'
    },
    ru: {
      'hero.title': 'КОМФОРТ',
      'hero.titleHighlight': 'НАЧИНАЕТСЯ ЗДЕСЬ',
      'hero.subtitle': 'Премиальные решения по отоплению, охлаждению и вентиляции для вашего дома и бизнеса.',
      'hero.services.cooling': 'Охлаждение',
      'hero.services.heating': 'Отопление',
      'hero.services.heatPumps': 'Тепловые насосы',
      'hero.cta.consultation': 'ПОЛУЧИТЬ БЕСПЛАТНУЮ КОНСУЛЬТАЦИЮ',
      'hero.cta.projects': 'ПОСМОТРЕТЬ ПРОЕКТЫ',
      'brand.tag': 'отопление • охлаждение • тепловые насосы',
      'language.label': 'Выберите язык',
      'language.en': 'Английский',
      'language.et': 'Эстонский',
      'language.ru': 'Русский'
    }
  };

  readonly currentLanguage = signal<SupportedLanguage>('en');
  readonly isMenuOpen = signal(false);

  constructor() {
    if (typeof window !== 'undefined') {
      const lang = localStorage.getItem('language') as SupportedLanguage;
      if (lang) {
        this.currentLanguage.set(lang);
      }
    }
  }

  translate(key: string): string {
    return this.translations[this.currentLanguage()][key] ?? this.translations.en[key] ?? key;
  }

  setLanguage(language: SupportedLanguage): void {
    localStorage.setItem('language', language);
    this.currentLanguage.set(language);
    this.isMenuOpen.set(false);
  }

  toggleMenu(): void {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  getFlag(language: SupportedLanguage): string {
    const flags: Record<SupportedLanguage, string> = {
      en: '🇬🇧',
      et: '🇪🇪',
      ru: '🇷🇺'
    };

    return flags[language];
  }
}
