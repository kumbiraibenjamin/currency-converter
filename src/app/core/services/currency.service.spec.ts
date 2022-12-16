import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DailyRate } from '../models/daily-rate.model';
import { CurrencyRate } from '../models/rates.model';
import { CurrencySymbol } from '../models/symbol.model';

import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update rates data from api and make a array of rates', () => {
    const apiResponse = {
      base: 'USD',
      date: '2022-04-14',
      rates: {
        EUR: 0.813399,
        GBP: 0.72007,
        JPY: 107.346001,
      },
      success: true,
      timestamp: 1519296206,
    };

    const expectedOutput: CurrencyRate[] = [
      { symbol: 'EUR', value: 0.813399 },
      { symbol: 'GBP', value: 0.72007 },
      { symbol: 'JPY', value: 107.346001 },
    ];

    const updatedResponse = service.updateRates(apiResponse, 1);

    expect(updatedResponse.length).toBeGreaterThanOrEqual(3);
    expect(updatedResponse).toBeInstanceOf(Array);
    expect(updatedResponse).toEqual(expectedOutput);
  });

  it('should update symbols data from api and make a array of symbols', () => {
    const apiResponse = {
      success: true,
      symbols: {
        AED: 'United Arab Emirates Dirham',
        AFN: 'Afghan Afghani',
        ALL: 'Albanian Lek',
        AMD: 'Armenian Dram',
      },
    };

    const expectedOutput: CurrencySymbol[] = [
      { symbol: 'AED', currency: 'United Arab Emirates Dirham' },
      { symbol: 'AFN', currency: 'Afghan Afghani' },
      { symbol: 'ALL', currency: 'Albanian Lek' },
      { symbol: 'AMD', currency: 'Armenian Dram' },
    ];

    const updatedResponse = service.updateSymbols(apiResponse);

    expect(updatedResponse.length).toBeGreaterThanOrEqual(4);
    expect(updatedResponse).toBeInstanceOf(Array);
    expect(updatedResponse).toEqual(expectedOutput);
  });

  it('should update historical data from api and make a array of date and currency', () => {
    const apiResponse = {
      base: 'EUR',
      end_date: '2012-05-03',
      rates: {
        '2012-05-29': {
          AUD: 1.278047,
        },
        '2012-05-30': {
          AUD: 1.274202,
        },
        '2012-05-31': {
          AUD: 1.280135,
        },
        '2012-06-28': {
          AUD: 1.278047,
        },
        '2012-06-29': {
          AUD: 1.274202,
        },
        '2012-06-30': {
          AUD: 1.270255,
        },
        '2012-07-29': {
          AUD: 1.278047,
        },
        '2012-07-30': {
          AUD: 1.274202,
        },
        '2012-07-31': {
          AUD: 1.280135,
        },
      },
      start_date: '2012-07-31',
      success: true,
      timeseries: true,
    };

    const expectedOutput: DailyRate[] = [
      { date: '2012-05-29', symbol: 'AUD', value: 1.278047 },
      { date: '2012-05-30', symbol: 'AUD', value: 1.274202 },
      { date: '2012-05-31', symbol: 'AUD', value: 1.280135 },
      { date: '2012-06-28', symbol: 'AUD', value: 1.278047 },
      { date: '2012-06-29', symbol: 'AUD', value: 1.274202 },
      { date: '2012-06-30', symbol: 'AUD', value: 1.270255 },
      { date: '2012-07-29', symbol: 'AUD', value: 1.278047 },
      { date: '2012-07-30', symbol: 'AUD', value: 1.274202 },
      { date: '2012-07-31', symbol: 'AUD', value: 1.280135 },
    ];

    const updatedResponse = service.updateHistory(apiResponse);

    expect(updatedResponse.length).toBeGreaterThanOrEqual(9);
    expect(updatedResponse).toBeInstanceOf(Array);
    expect(updatedResponse).toEqual(expectedOutput);
  });

  it('should update historical data from api response and and return last entry of each month', () => {
    const expectedInput: DailyRate[] = [
      { date: '2012-05-29', symbol: 'AUD', value: 1.278047 },
      { date: '2012-05-30', symbol: 'AUD', value: 1.274202 },
      { date: '2012-05-31', symbol: 'AUD', value: 1.280135 },
      { date: '2012-06-28', symbol: 'AUD', value: 1.278047 },
      { date: '2012-06-29', symbol: 'AUD', value: 1.274202 },
      { date: '2012-06-30', symbol: 'AUD', value: 1.270255 },
      { date: '2012-07-29', symbol: 'AUD', value: 1.278047 },
      { date: '2012-07-30', symbol: 'AUD', value: 1.274202 },
      { date: '2012-07-31', symbol: 'AUD', value: 1.280135 },
    ];

    const expectedOutput: { months: string[]; result: number[] } = {
      months: ['2012-05', '2012-06', '2012-07'],
      result: [1.280135, 1.270255, 1.280135],
    };

    const updatedResponse = service.getMonthlyData(expectedInput);

    expect(updatedResponse).toEqual(expectedOutput);
  });

  it('should get list of top currencies as a comma separated string', () => {
    const expectedOutput: string =
      'USD,JPY,GBP,AUD,CAD,CHF,CNH,HKD,NZD,AED,AFN';

    const updatedResponse = service.getTopCurrencies('EUR', 'AFN');

    expect(updatedResponse).toEqual(expectedOutput);
  });
});
