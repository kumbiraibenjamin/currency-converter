import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { CurrencyRate } from 'src/app/core/models/rates.model';
import { CurrencySymbol } from 'src/app/core/models/symbol.model';
import { CurrencyService } from 'src/app/core/services/currency.service';
import { LoaderService } from 'src/app/shared/components/loader/loader.service';

@Component({
  selector: 'app-currency-detail',
  templateUrl: './currency-detail.component.html',
  styleUrls: ['./currency-detail.component.scss'],
})
export class CurrencyDetailComponent implements OnInit {
  symbols$: Observable<any> | undefined;
  symbols: CurrencySymbol[] = [];

  to: CurrencySymbol | undefined;
  from: CurrencySymbol | undefined;

  toValue: string = '';
  fromValue: string = '';

  amount: number = 1;
  convertedAmount: number | undefined;

  topCurrencies: CurrencyRate[] = [];
  loading: boolean = false;
  error: boolean = false;

  constructor(
    private currencyService: CurrencyService,
    private loaderService: LoaderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;
    this.loaderService.showLoader();

    this.route.params
      .pipe(
        switchMap((params: any) => {
          const currencies = params.currency.split('-');
          this.fromValue = currencies[0];
          this.toValue = currencies[1];

          this.symbols$ = this.currencyService.getSymbols();
          return this.symbols$;
        }),
        switchMap((symbols: CurrencySymbol[]) => {
          // set default values
          this.symbols = symbols;
          this.to = symbols.find((symbol) => symbol.symbol === this.toValue);
          this.from = symbols.find(
            (symbol) => symbol.symbol === this.fromValue
          );

          return this.currencyService.convert(
            this.toValue,
            this.fromValue,
            this.amount,
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
          this.loading = false;
          this.loaderService.hideLoader();
        },
        error: () => {
          this.loading = false;
          this.error = true;
          this.loaderService.hideLoader();
        },
        complete: () => {
          this.loading = false;
          this.loaderService.hideLoader();
          console.log('incomplete');
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
