import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler
  ): Observable<HttpEvent<T>> {
    const headers = this.setHeaders();

    const authReq = req.clone({ headers });

    return next.handle(authReq);
  }

  setHeaders(): HttpHeaders {
    const api_key = environment.API_KEY;
    let headerObj = new HttpHeaders();

    // add api key
    headerObj = headerObj.set('apikey', api_key);

    return headerObj;
  }
}
