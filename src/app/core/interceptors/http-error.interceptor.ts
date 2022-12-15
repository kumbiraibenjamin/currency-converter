import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { ToastService } from 'src/app/shared/toast/toast.service';
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
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error

          switch (error.status) {
            case 404:
              this.toastService.showDanger(
                'The requested resource does not exist.'
              );
              break;

            case 101:
              this.toastService.showDanger(
                'No API Key was specified or an invalid API Key was specified.'
              );
              break;

            case 103:
              this.toastService.showDanger(
                'The requested API endpoint does not exist.'
              );
              break;
            case 104:
              this.toastService.showDanger(
                'The maximum allowed API amount of monthly API requests has been reached.'
              );
              break;
            case 105:
              this.toastService.showDanger(
                'The current subscription plan does not support this API endpoint.'
              );
              break;
            case 106:
              this.toastService.showDanger(
                'The current request did not return any results.'
              );
              break;
            case 102:
              this.toastService.showDanger(
                'The account this API request is coming from is inactive.'
              );
              break;
            case 201:
              this.toastService.showDanger(
                'An invalid base currency has been entered.'
              );
              break;
            case 202:
              this.toastService.showDanger(
                'One or more invalid symbols have been specified.'
              );
              break;
            case 301:
              this.toastService.showDanger(
                'No date has been specified. [historical]'
              );
              break;
            case 302:
              this.toastService.showDanger(
                'An invalid date has been specified. [historical, convert]'
              );
              break;
            case 403:
              this.toastService.showDanger(
                'No or an invalid amount has been specified. [convert]'
              );
              break;
            case 501:
              this.toastService.showDanger(
                'No or an invalid timeframe has been specified. [timeseries]'
              );
              break;
            case 502:
              this.toastService.showDanger(
                'No or an invalid "start_date" has been specified. [timeseries, fluctuation]'
              );
              break;
            case 503:
              this.toastService.showDanger(
                'No or an invalid "end_date" has been specified. [timeseries, fluctuation]'
              );
              break;
            case 504:
              this.toastService.showDanger(
                'An invalid timeframe has been specified. [timeseries, fluctuation]'
              );
              break;
            case 505:
              this.toastService.showDanger(
                'The specified timeframe is too long, exceeding 365 days. [timeseries, fluctuation]'
              );
              break;

            default:
              this.toastService.showDanger(
                'Unknown error, please check connectivity and restart the application'
              );
              break;
          }
        }
        return throwError(() => new Error(errorMessage));
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
