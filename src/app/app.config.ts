import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideIcons } from '@ng-icons/core';
import { heroCloudArrowDown, heroFire, heroArrowsUpDown } from '@ng-icons/heroicons/outline';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { SettingsService } from './core/settings/settings.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(),
    provideIcons({ heroCloudArrowDown, heroFire, heroArrowsUpDown }),
    provideHttpClient(),
    provideAppInitializer(() => inject(SettingsService).load())
  ]
};
