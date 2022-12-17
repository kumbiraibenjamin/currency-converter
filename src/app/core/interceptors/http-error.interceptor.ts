import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, of, retry, switchMap, throwError } from 'rxjs';
import { ToastService } from 'src/app/shared/components/toast/toast.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  returnUrl = this.router.url;
  constructor(private toastService: ToastService, private router: Router) {}

  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    return next.handle(req).pipe(
      retry(1),
      switchMap((res: any) => {
        if (res?.body?.success === false) {
          if (res?.body?.error?.info) {
            return throwError(() => new Error(res?.body?.error?.info));
          }
        }
        return of(res);
      }),
      catchError((error: HttpErrorResponse) => {
        this.toastService.showDanger(error.error.message);
        return throwError(() => error);
      })
    );
  }
}

// 404	The requested resource does not exist.
// 101	No API Key was specified or an invalid API Key was specified.
// 102	The account this API request is coming from is inactive.
// 103	The requested API endpoint does not exist.
// 104	The maximum allowed API amount of monthly API requests has been reached.
// 105	The current subscription plan does not support this API endpoint.
// 106	The current request did not return any results.
// 201	An invalid base currency has been entered.
// 202	One or more invalid symbols have been specified.
// 301	No date has been specified. [historical]
// 302	An invalid date has been specified. [historical, convert]
// 403	No or an invalid amount has been specified. [convert]
// 501	No or an invalid timeframe has been specified. [timeseries]
// 502	No or an invalid "start_date" has been specified. [timeseries, fluctuation]
// 503	No or an invalid "end_date" has been specified. [timeseries, fluctuation]
// 504	An invalid timeframe has been specified. [timeseries, fluctuation]
// 505	The specified timeframe is too long, exceeding 365 days. [timeseries, fluctuation]
