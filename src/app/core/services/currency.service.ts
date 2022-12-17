import { Injectable } from '@angular/core';
import { of, map } from 'rxjs';
import { DailyRate } from '../models/daily-rate.model';
import { CurrencyRate } from '../models/rates.model';
import { CurrencySymbol } from '../models/symbol.model';
import { ApiService } from './api.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  amount = 1;
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

  getHistoricalData(
    base: string,
    currencies: string,
    start_date: string,
    end_date: string
  ) {
    return this.apiService
      .get(
        `timeseries?start_date=${start_date}&end_date=${end_date}&symbols=${currencies}&base=${base}`
      )
      .pipe(
        map((response: any) => {
          // {
          //   "base": "EUR",
          //   "end_date": "2012-05-03",
          //   "rates": {
          //     "2012-05-01": {
          //       "AUD": 1.278047,
          //       "CAD": 1.302303,
          //       "USD": 1.322891
          //     },
          //     "2012-05-02": {
          //       "AUD": 1.274202,
          //       "CAD": 1.299083,
          //       "USD": 1.315066
          //     },
          //     "2012-05-03": {
          //       "AUD": 1.280135,
          //       "CAD": 1.296868,
          //       "USD": 1.314491
          //     }
          //   },
          //   "start_date": "2012-05-01",
          //   "success": true,
          //   "timeseries": true
          // }

          const currencyDailyData = this.updateHistory(response);

          return this.getMonthlyData(currencyDailyData);
        })
      );
  }

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

  getMonthlyData(data: DailyRate[]): { months: string[]; result: number[] } {
    const monthSet: Set<string | undefined> = new Set<string | undefined>(
      data.map((d) => d.date?.slice(0, 7))
    );

    const months: string[] = <string[]>Array.from(monthSet);
    const result: number[] = [];

    // data.forEach((d) => {
    months.forEach((m: string) => {
      const mData = data.filter((d) => d.date?.includes(m));
      const monthlyRate = mData[mData.length - 1].value;
      result.push(monthlyRate);
    });

    return { months, result };
  }

  updateHistory(response: any): DailyRate[] {
    const rateKeys = Object.keys(response.rates);
    const currencyDailyData: DailyRate[] = [];

    rateKeys.forEach((key) => {
      const currencyKey = Object.keys(response.rates[key])[0];
      const currencyValue = response.rates[key][currencyKey];

      const currencyDate: DailyRate = {
        date: key,
        value: currencyValue,
        symbol: currencyKey,
      };

      currencyDailyData.push(currencyDate);
    });

    return currencyDailyData;
  }

  updateSymbols(response: any): CurrencySymbol[] {
    const symbolKeys = Object.keys(response.symbols);
    const symbols: CurrencySymbol[] = [];

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

  updateRates(response: any, amount: number): CurrencyRate[] {
    const rateKeys = Object.keys(response.rates);
    const rates: CurrencyRate[] = [];

    rateKeys.forEach((rateKey: string) => {
      const symbol: CurrencyRate = {
        value: response.rates[rateKey] * amount,
        symbol: rateKey,
      };
      rates.push(symbol);
    });

    return rates;
  }

  getTopCurrencies(from: string, to: string): string {
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

    const filtered: string[] = [];
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
