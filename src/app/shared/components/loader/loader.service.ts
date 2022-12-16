import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  show = false;

  constructor() { }

  showLoader() {
    this.show = true;
  }

  hideLoader() {
    this.show = false;
  }
}
