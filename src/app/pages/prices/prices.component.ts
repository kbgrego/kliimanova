import { Component, inject } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { PricingService } from '../../core/pricing/pricing.service';
import { UtilsService } from '../../services/utils.service';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PricingItem } from '../../core/pricing/pricing.model';

@Component({
  selector: 'app-prices',
  imports: [FontAwesomeModule],
  templateUrl: './prices.component.html',
  styleUrl: './prices.component.css',
})

export class PricesComponent {

  protected readonly translationService = inject(TranslationService);
  protected readonly pricingService = inject(PricingService);
  protected readonly utils = inject(UtilsService);

  readonly faTemperatureArrowUp: IconProp|undefined;

  pricing = this.pricingService.pricing;

  wc = '';

  ngOnInit() {
    console.log('PricesComponent initialized');
    this.pricingService
      .loadPricing('HEATING_PIPES')
      .subscribe();
  }

  protected t(key: string): string {
    return this.translationService.translate(key);
  }

  protected getOfferPrice(): PricingItem[] {
    return this.pricingService.getByService('HEATING_PIPES');
  }

  protected getBasicPrice(): string {
    return this.utils.formatWithSpaces(this.pricingService
      .getByService('HEATING_PIPES')
      .find(x => x.package_code === 'BASIC')
      ?.price);
  }
}
