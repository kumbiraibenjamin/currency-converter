import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, switchMap } from 'rxjs';
import { CurrencyRate } from 'src/app/core/models/rates.model';
import { CurrencySymbol } from 'src/app/core/models/symbol.model';
import { ApiService } from 'src/app/core/services/api.service';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  symbols$: Observable<any> | undefined;
  symbols: CurrencySymbol[] = [];

  to: CurrencySymbol | undefined;
  from: CurrencySymbol | undefined;

  defaultTo: string = 'USD';
  defaultFrom: string = 'EUR';

  amount: number = 1;
  convertedAmount: number | undefined;

  topCurrencies: CurrencyRate[] = [];
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private currencyService: CurrencyService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.loaderService.showLoader();

    this.symbols$ = this.currencyService.getSymbols();
    this.symbols$
      .pipe(
        switchMap((symbols: CurrencySymbol[]) => {
          // set default values
          this.symbols = symbols;
          this.to = symbols.find((symbol) => symbol.symbol === this.defaultTo);
          this.from = symbols.find(
            (symbol) => symbol.symbol === this.defaultFrom
          );

          return this.currencyService.convert(
            this.defaultTo,
            this.defaultFrom,
            this.currencyService.amount,
            this.symbols
          );
        })
      )
      .subscribe({
        next: (data: any) => {
          const { to, from, amount, topCurrencies, convertedAmount } = data;

          this.to = to;
          this.from = from;
          this.amount = amount;
          this.topCurrencies = topCurrencies;
          this.convertedAmount = convertedAmount;
        },
        error: () => {
          this.loading = false;
          this.error = true;
          this.loaderService.hideLoader();
        },
        complete: () => {
          this.loading = false;
          this.loaderService.hideLoader();
        },
      });
  }

  onConvertClick(event: {
    toSymbol: string;
    fromSymbol: string;
    amount: number;
  }) {
    this.loading = true;
    this.loaderService.showLoader();

    const { toSymbol, fromSymbol, amount } = event;

    // set global amount
    this.currencyService.amount = amount;

    this.currencyService
      .convert(toSymbol, fromSymbol, amount, this.symbols)
      .subscribe({
        next: (data: any) => {
          const { to, from, amount, topCurrencies, convertedAmount } = data;

          this.to = to;
          this.from = from;
          this.amount = amount;
          this.topCurrencies = topCurrencies;
          this.convertedAmount = convertedAmount;
        },
        error: () => {
          this.loading = false;
          this.error = true;
          this.loaderService.hideLoader();
        },
        complete: () => {
          this.loading = false;
          this.loaderService.hideLoader();
        },
      });
  }
}
