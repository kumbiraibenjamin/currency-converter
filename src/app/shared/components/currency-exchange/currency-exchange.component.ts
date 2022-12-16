import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CurrencySymbol } from 'src/app/core/models/symbol.model';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
})
export class CurrencyExchangeComponent {
  @Input() symbols: CurrencySymbol[] = [];
  @Input() to: string | undefined = '';
  @Input() from: string | undefined = '';
  @Input() amount: number = 1;
  @Input() convertedAmount: number | undefined;
  @Input() loading: boolean = true;
  @Input() error: boolean = false;

  @Input() showDetailsButton = true;

  @Output() convert: EventEmitter<{
    toSymbol: string;
    fromSymbol: string;
    amount: number;
  }> = new EventEmitter<{
    toSymbol: string;
    fromSymbol: string;
    amount: number;
  }>();

  faArrowRightArrowleft = faArrowRightArrowLeft;

  constructor(private router: Router) {}

  onToCurrencyChange() {}

  onFromCurrencyChange() {}

  onConvertClick() {
    if (this.to && this.from) {
      this.convert.emit({
        toSymbol: this.to,
        fromSymbol: this.from,
        amount: this.amount,
      });
    }
  }

  onMoreDetailsClick() {
    const exchangeCurrencies: string = `${this.from}-${this.to}`;
    this.router.navigate(['currency-exchanger', 'detail', exchangeCurrencies]);
  }

  onSwapClick() {
    const temp = this.to;
    this.to = this.from;
    this.from = temp;

    if (this.showDetailsButton) {
      // Run conversion
      this.onConvertClick();
    } else {
      // Run change url and force conversion
      const exchangeCurrencies: string = `${this.from}-${this.to}`;
      this.router.navigate([
        'currency-exchanger',
        'detail',
        exchangeCurrencies,
      ]);
    }
  }

  onHomeClick() {
    this.router.navigate(['']);
  }
}
