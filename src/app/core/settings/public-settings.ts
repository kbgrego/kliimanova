export interface PublicSettings {
  company_name?: string;
  company_email?: string;
  company_phone?: string;
  company_address?: string;
  default_language?: 'uk' | 'en';
  social_links?: {
    facebook?: string;
    instagram?: string;
    telegram?: string;
    whatsapp?: string;
  };
}

export const DEFAULT_PUBLIC_SETTINGS: PublicSettings = {
  company_name: 'Kliimanova',
  company_email: 'mail@kliimanova.ee',
  company_phone: '+372 5888 4341',
  company_address: 'Tallinn, Estonia',
  default_language: 'en',
  social_links: {
    facebook: 'https://www.facebook.com/Kliimanova/',
    instagram: 'https://www.instagram.com/Kliimanova_heating_cooling',
    telegram: '',
    whatsapp: 'https://api.whatsapp.com/send?phone=37258884341'
  }
};
