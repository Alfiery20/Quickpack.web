import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors/httpInterceptorProviderst';

export const appConfig: ApplicationConfig = {
  providers:
    [
      httpInterceptorProviders,
      provideHttpClient(withInterceptorsFromDi()),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes)
    ]
};
