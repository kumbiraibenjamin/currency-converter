import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  setSessionStorage<T>(key: string, item: T | T[]) {
    const stringObj = JSON.stringify(item);
    sessionStorage.setItem(key, stringObj);
  }

  getSessionStorage(key: string) {
    const objs = sessionStorage.getItem(key);
    if (objs) {
      return JSON.parse(objs);
    } else {
      return null;
    }
  }

  clearSessionStorage() {
    sessionStorage.clear();
  }
}
