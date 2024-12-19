import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { VALIDATION_ERRORS_CONTENT } from '@ui/components';
import { validationErrorsContent } from './data/validation-errors-content';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  AuthHttpInterceptor,
  authHttpInterceptorFn,
  AuthService,
  provideAuth0,
} from '@auth0/auth0-angular';
import { UsersService, usersStore } from '@data-access/users';
import { MessageService } from 'primeng/api';
import { environment } from '../environments/environment';
import { initializeApp } from './initialize-app';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [UsersService, AuthService, usersStore, Router],
    },
    provideZoneChangeDetection({ eventCoalescing: true }),
    importProvidersFrom([BrowserAnimationsModule]),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideRouter(appRoutes),
    provideAuth0(environment.authConfig),
    AuthHttpInterceptor,
    provideHttpClient(withInterceptors([authHttpInterceptorFn])),
    { provide: VALIDATION_ERRORS_CONTENT, useValue: validationErrorsContent },
    MessageService,
  ],
};
