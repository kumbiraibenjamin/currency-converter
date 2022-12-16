import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  get(endPoint: string) {
    return this.http.get(`${this.url}/${endPoint}`);
  }
}
