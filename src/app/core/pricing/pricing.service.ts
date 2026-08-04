import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PricingItem, PricingResponse } from './pricing.model';


@Injectable({
  providedIn: 'root'
})
export class PricingService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = '/api/public/price';


  private readonly _pricing = signal<PricingItem[]>([]);

  readonly pricing = this._pricing.asReadonly();


  readonly services = computed(() => {
    const items = this.pricing();

    return [...new Set(
      items.map(item => item.service_code)
    )];
  });


  loadPricing(serviceCode?: string): Observable<PricingResponse> {

    let url = this.apiUrl;

    if (serviceCode) {
      url += `?service_code=${serviceCode}`;
    }

   return this.http.get<PricingResponse>(url).pipe(
      tap(response => {
        if (response.success) {
          this._pricing.set(response.data);
          this.assignServicesToPackages(response.data);
        }
      })
    );
  }

  getByService(serviceCode: string): PricingItem[] {

    return this.pricing()
      .filter(x => x.service_code === serviceCode);

  }

  assignServicesToPackages(prcData: PricingItem[]): void {
    prcData.forEach(item => {
      if(item.service_code === 'HEATING_PUMPS')
        this.assignServicesToHeatPumpPackages(item);
      if(item.service_code === 'COOLING')
        this.assignServicesToCoolingPackages(item);
      if(item.service_code === 'HEATING')
        this.assignServicesToHeatingPackages(item);
    });
  }

  assignServicesToHeatPumpPackages(item: PricingItem): void {
    switch(item.package_code) {
      case 'BASIC':
        item.services = [
              'Outdoor & indoor unit installation',
              'Connection to existing heating system',
              'Hydraulic connection',
              'Standard connection installation',
              'Refrigerant piping',
              'System vacuuming',
              'Leak test',
              'Connecting of communications',
              'System filling and air purging',
              'Equipment setup and start-up'
        ];
        break;
      case 'STANDARD':
        item.services = [
              'Everything from the basic package',
              '3-way valve installation and connection',
              'Heating / DHW switching setup',
              'Hot water heating operation check'
        ];
        break;
      case 'PREMIUM':
        item.services = [
              'Everything from the previous package',
              'Buffer tank connection',
              'Additional hydraulic installation',
              'System setup with buffer tank'
        ];
        break;
    }
  }

  assignServicesToCoolingPackages(item: PricingItem): void {
    switch(item.package_code) {
      case 'BASIC':
        item.services = [
          'Indoor unit installation',
          'Outdoor unit installation',
          'Up to 3m refrigerant piping',
          'Electrical communication cable',
          'Condensate drain',
          'Vacuuming',
          'Leak test',
          'System commissioning',
          'Basic operation instruction'
        ];
        break;
    case 'STANDARD':
      item.services = [
        'Everything from Basic package',
        'Decorative cable trunking',
        'Wall penetration finishing',
        'Outdoor anti-vibration mounts',
        'Extended system testing',
        'Wi-Fi setup',
        'Customer training'];
      break;
    case 'PREMIUM':
      item.services = [
        'Outdoor unit installation',
        'Multiple indoor units',
        'Refrigerant piping installation',
        'System vacuuming',
        'Leak testing',
        'Electrical communication setup',
        'Commissioning and balancing',
        'User training'
      ];
      break;
    }
  }

  assignServicesToHeatingPackages(item: PricingItem): void {
    switch(item.package_code) {
      case 'BASIC':
        item.services = [
          'Indoor unit installation',
          'Outdoor unit installation',
          'Up to 3m refrigerant piping',
          'Electrical communication cable',
          'Condensate drain',
          'Vacuuming',
          'Leak test',
          'System commissioning',
          'Basic operation instruction'
        ];
        break;
      case 'STANDARD':
        item.services = [
          'Everything from Basic package',
          'Winter operation setup',
          'Drain heating verification',
          'Outdoor protection check',
          'Extended performance testing',
          'Wi-Fi setup'
        ];
        break;
      case 'PREMIUM':
        item.services = [
          'Everything from Standard package',
          'Premium installation finish',
          'Extended piping allowance',
          'Advanced commissioning and balancing',
          'Performance optimisation',
          'Full customer training'
        ];
        break;
    }
  }
}

