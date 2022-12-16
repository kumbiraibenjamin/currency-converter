import { CurrencySymbol } from './symbol.model';

export interface CurrencyRate extends CurrencySymbol {
  value: number;
}
