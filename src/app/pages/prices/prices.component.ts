import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { PricingService } from '../../core/pricing/pricing.service';

@Component({
  selector: 'app-prices',
  imports: [],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css',
})

export class PricesComponent {
  protected readonly translationService = inject(TranslationService);
  protected readonly pricingService = inject(PricingService);

  constructor () {

  }

  protected t(key: string): string {
    return this.translationService.translate(key);
  }

  protected getBasicPrice(): string {
    return this.pricingService
      .getByService('HEATING_PIPES')
      .find(x => x.package_code === 'BASIC')
      ?.price + ' €';
  }
}
