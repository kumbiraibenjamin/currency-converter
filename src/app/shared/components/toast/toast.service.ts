import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts: any[] = [];
  defaultDelay: number = 5000;

  constructor() { }

  private show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }

  showBottomStandard(message: string, delay: number = this.defaultDelay) {
    this.show(message, { classname: ' w-100 bottom', delay });
  }

  showSuccess(message: string, delay: number = this.defaultDelay) {
    this.show(message, { classname: 'bg-success text-light w-100', delay });
  }

  showDanger(message: string, delay: number = this.defaultDelay) {
    this.show(message, { classname: 'bg-danger text-light w-100', delay });
  }

  showWarning(message: string, delay: number = this.defaultDelay) {
    this.show(message, { classname: 'bg-warning text-dark w-100', delay });
  }

  showStandard(message: string, delay: number = this.defaultDelay) {
    this.show(message, { classname: ' w-100', delay });
  }


}
