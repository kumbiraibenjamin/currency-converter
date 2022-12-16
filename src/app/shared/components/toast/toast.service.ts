import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  toasts: any[] = [];
  defaultDelay: number = 5000;

  constructor() {}

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  showDanger(message: string, delay: number = this.defaultDelay) {
    this.show(message, { classname: 'bg-danger text-light w-100', delay });
  }
}
