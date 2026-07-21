import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-brand-logo',
  imports: [],
  templateUrl: './brand-logo.html',
  styleUrl: './brand-logo.css',
})
export class BrandLogo {
  protected readonly translationService = inject(TranslationService);

  protected t(key: string): string {
    return this.translationService.translate(key);
  }
}
