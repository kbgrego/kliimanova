export interface PricingItem {
  service_code: string;
  service_name: string;
  package_code: string;
  package_name: string;
  description: string;
  price: number;
  duration_hours?: number;
  recommended: boolean;
  display_order: number;
}

export interface PricingResponse {
  success: boolean;
  count: number;
  data: PricingItem[];
}