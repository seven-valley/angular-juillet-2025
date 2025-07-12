import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { PersonneService } from './services/personne.service';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),PersonneService,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
