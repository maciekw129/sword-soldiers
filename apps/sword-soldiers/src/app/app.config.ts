import {
  APP_INITIALIZER,
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { VALIDATION_ERRORS_CONTENT } from '@ui/components';
import { VALIDATION_ERRORS_DEFAULT_CONTENT } from './data/validation-errors-default-content.const';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from '../environments/environment';
import { providePrimeNG } from 'primeng/config';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import Aura from '@primeng/themes/aura';
import { INITIALIZE_USER_DEPS, initializeUser } from '@users/api';
import { errorHandlingInterceptor } from './core/error-handling/error-handling.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeUser,
      multi: true,
      deps: INITIALIZE_USER_DEPS,
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
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn, errorHandlingInterceptor])
    ),
    {
      provide: VALIDATION_ERRORS_CONTENT,
      useValue: VALIDATION_ERRORS_DEFAULT_CONTENT,
    },
    MessageService,
    ConfirmationService,
  ],
};
