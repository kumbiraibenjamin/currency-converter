import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss'],
})
export class CurrencyCardComponent {
  @Input() symbol: string = '';
  @Input() convertedAmount: number | undefined;

  @HostBinding('style.--color')
  @Input()
  color: string = '#871e35';
}
