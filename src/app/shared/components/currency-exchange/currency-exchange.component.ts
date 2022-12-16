import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, TitleStrategy } from '@angular/router';
import {
  faArrowRight,
  faArrowRightArrowLeft,
} from '@fortawesome/free-solid-svg-icons';
import { CurrencySymbol } from 'src/app/core/models/symbol.model';
import { UtilsService } from 'src/app/core/services/utils.service';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
})
export class CurrencyExchangeComponent {
  @Input() symbols: CurrencySymbol[] = [];
  @Input() to: string | undefined = '';
  @Input() from: string | undefined = '';
  @Input() toName: string | undefined = '';
  @Input() fromName: string | undefined = '';
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
  faArrowRight = faArrowRight;

  constructor(private router: Router, private utilsService: UtilsService) {}

  onToCurrencyChange() {
    this.convertedAmount = undefined;
  }

  onFromCurrencyChange() {
    this.convertedAmount = undefined;
  }

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
    if (this.showDetailsButton) {
      const temp = this.to;
      this.to = this.from;
      this.from = temp;

      // Run conversion
      this.onConvertClick();
    }
  }

  onHomeClick() {
    this.router.navigate(['']);
  }
}
