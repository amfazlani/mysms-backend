import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './auth/auth-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(HttpClientModule), provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
