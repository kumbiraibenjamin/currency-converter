import { CurrencyRate } from './rates.model';

export interface DailyRate extends CurrencyRate {
  date: string;
}
