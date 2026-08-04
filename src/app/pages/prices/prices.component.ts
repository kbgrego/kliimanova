import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { TranslationService } from '../../services/translation.service';
import { PricingService } from '../../core/pricing/pricing.service';
import { UtilsService } from '../../services/utils.service';
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PricingItem } from '../../core/pricing/pricing.model';
import { ActivatedRoute, Routes } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

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

  protected serviceCode: string = '';

  readonly loading = signal(true);

  private platformId = inject(PLATFORM_ID);

  wc = '';

  constructor( private route: ActivatedRoute ) {
  }

  ngOnInit() {
    this.serviceCode = this.route.snapshot.data['serviceCode'];

    // Skip running this HTTP request on the Node.js server during build
    if (isPlatformBrowser(this.platformId)) {
      this.pricingService
        .loadPricing(this.serviceCode)
        .subscribe({
          complete: () => this.loading.set(false),
          error: () => this.loading.set(false)
        });
    } else {
      // Set loading to false immediately on the server so rendering completes
      this.loading.set(false);
    }
  }

  protected t(key: string): string {
    return this.translationService.translate(key);
  }

  protected getOfferPrice(): PricingItem[] {
    return this.pricingService.getByService(this.serviceCode);
  }

  protected getBasicPrice(): string {
    return this.utils.formatWithSpaces(this.pricingService
      .getByService(this.serviceCode)
      .find(x => x.package_code === 'BASIC')
      ?.price);
  }
}
