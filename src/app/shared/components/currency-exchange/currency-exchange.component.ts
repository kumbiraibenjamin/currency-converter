import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { CurrencySymbol } from 'src/app/core/models/symbol.model';

@Component({
  selector: 'app-currency-exchange',
  templateUrl: './currency-exchange.component.html',
  styleUrls: ['./currency-exchange.component.scss'],
})
export class CurrencyExchangeComponent implements OnChanges {
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

  ngOnChanges(simpleChanges: any) {
    // if (this.to) this.toValue = this.to?.symbol;
    // if (this.from) this.fromValue = this.from?.symbol;
    console.log(simpleChanges);
  }

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

    // Run conversion
    this.onConvertClick();
  }

  onHomeClick() {
    this.router.navigate(['']);
  }
}
