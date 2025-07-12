import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { AppareilService } from './services/appareil.service';

export const appConfig: ApplicationConfig = {
  providers: [AppareilService,provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes)]
};
