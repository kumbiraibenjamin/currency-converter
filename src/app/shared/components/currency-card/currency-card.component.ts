import { Component, HostBinding, Input, OnChanges } from '@angular/core';
import { CurrencySymbol } from 'src/app/core/models/symbol.model';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
})
export class CurrencyCardComponent implements OnChanges {
  @Input() symbol: string = '';
  @Input() convertedAmount: number | undefined;

  @HostBinding('style.--color')
  @Input()
  color: string = '#871e35';

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(simpleChanges: any) {
    // if (this.to) this.toValue = this.to?.symbol;
    // if (this.from) this.fromValue = this.from?.symbol;
    console.log(simpleChanges);
  }
}
