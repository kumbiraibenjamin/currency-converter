import { Injectable } from '@angular/core';
import { of, map } from 'rxjs';
import { CurrencyRate } from '../models/rates.model';
import { CurrencySymbol } from '../models/symbol.model';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(
    private apiService: ApiService,
    private utilsService: UtilsService
  ) {}

  getSymbols() {
    const symbols = this.utilsService.getSessionStorage('symbols');
    if (symbols) {
      return of(symbols);
    } else {
      return this.apiService.get(`symbols`).pipe(
        map((response: any) => {
          // {
          //   "success": true,
          //   "symbols": {
          //     "AED": "United Arab Emirates Dirham",
          //     "AFN": "Afghan Afghani",
          //     "ALL": "Albanian Lek",
          //     "AMD": "Armenian Dram",
          //     [...]
          //     }
          // }

          const symbols: CurrencySymbol[] = this.updateSymbols(response);

          return symbols;
        })
      );
    }
  }

  getExchangeValue(base: string, amount: number, topCurrencies: string) {
    return this.apiService
      .get(`latest?symbols=${topCurrencies}&base=${base}`)
      .pipe(
        map((response: any) => {
          // {
          //   "base": "USD",
          //   "date": "2022-04-14",
          //   "rates": {
          //     "EUR": 0.813399,
          //     "GBP": 0.72007,
          //     "JPY": 107.346001
          //   },
          //   "success": true,
          //   "timestamp": 1519296206
          // }

          return this.updateRates(response, amount);
        })
      );
  }

  getHistoricalData() {}

  convert(
    toSymbol: string,
    fromSymbol: string,
    amount: number,
    symbols: CurrencySymbol[]
  ) {
    const to = symbols.find((symbol) => symbol.symbol === toSymbol);
    const from = symbols.find((symbol) => symbol.symbol === fromSymbol);

    let topCurrencies: CurrencyRate[] = [];
    let convertedAmount: number | undefined = 0;

    return this.getExchangeValue(
      fromSymbol,
      amount,
      this.getTopCurrencies(fromSymbol, toSymbol)
    ).pipe(
      map((data: CurrencyRate[]) => {
        topCurrencies = data.filter(
          (currency: CurrencyRate) => currency.symbol !== toSymbol
        );
        convertedAmount = data.find(
          (currency: CurrencyRate) => currency.symbol === toSymbol
        )?.value;

        return {
          to,
          from,
          amount,
          toSymbol,
          fromSymbol,
          topCurrencies,
          convertedAmount,
        };
      })
    );
  }

  private updateSymbols(response: any): CurrencySymbol[] {
    const symbolKeys = Object.keys(response.symbols);
    let symbols: CurrencySymbol[] = [];

    symbolKeys.forEach((symbolKey: string) => {
      const symbol: CurrencySymbol = {
        currency: response.symbols[symbolKey],
        symbol: symbolKey,
      };
      symbols.push(symbol);
    });

    // add to seesion storage to reduce redundant calls
    this.utilsService.setSessionStorage('symbols', symbols);

    return symbols;
  }

  private updateRates(response: any, amount: number): CurrencyRate[] {
    const rateKeys = Object.keys(response.rates);
    let rates: CurrencyRate[] = [];

    rateKeys.forEach((rateKey: string) => {
      const symbol: CurrencyRate = {
        value: response.rates[rateKey] * amount,
        symbol: rateKey,
      };
      rates.push(symbol);
    });
    console.log(rates);
    return rates;
  }

  private getTopCurrencies(from: string, to: string): string {
    const top = [
      'EUR',
      'USD',
      'JPY',
      'GBP',
      'AUD',
      'CAD',
      'CHF',
      'CNH',
      'HKD',
      'NZD',
      'AED',
      'ZAR',
    ];

    let filtered: string[] = [];
    let counter = 0;

    top.forEach((t) => {
      if (counter < 10 && t !== to && t !== from) {
        filtered.push(t);
        counter++;
      }
    });

    // Add to value
    filtered.push(to);

    return filtered.join(',');
  }

  // Top 10 currencies
  // *****************
  // US dollar (USD)
  // Euro (EUR)
  // Japanese yen (JPY)
  // Pound sterling (GBP)
  // Australian dollar (AUD)
  // Canadian dollar (CAD)
  // Swiss franc (CHF)
  // Chinese renminbi (CNH)
  // Hong Kong dollar (HKD)
  // New Zealand dollar (NZD)
}
