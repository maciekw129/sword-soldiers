import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, Observable, throwError } from 'rxjs';

export const errorHandlingInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const messageService = inject(MessageService);

  return next(request).pipe(
    catchError((error) => {
      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Something went wrong.',
      });

      return throwError(() => error);
    })
  );
};
