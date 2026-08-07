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
        if (response.success)
          this._pricing.set(response.data);
      })
    );
  }

  getByService(serviceCode: string): PricingItem[] {
    return this.pricing()
      .filter(x => x.service_code === serviceCode);
  }
}

