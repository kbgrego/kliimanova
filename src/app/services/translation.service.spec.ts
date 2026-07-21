import { TranslationService } from './translation.service';

describe('TranslationService', () => {
  let service: TranslationService;

  beforeEach(() => {
    service = new TranslationService();
  });

  it('should translate the hero title in English by default', () => {
    expect(service.translate('hero.title')).toBe('COMFORT');
  });

  it('should switch to Estonian and return the translated text', () => {
    service.setLanguage('et');

    expect(service.translate('hero.title')).toBe('MUGAVUS');
  });
});
