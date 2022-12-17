import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'app-chartjs-container',
  templateUrl: './chartjs-container.component.html',
  styleUrls: ['./chartjs-container.component.scss'],
})
export class ChartjsContainerComponent {
  @Input() data: any;
  @Input() options: any;
  @Input() type: any;

  @HostBinding('style.--chartWidth')
  @Input()
  chartWidth = '';

  @HostBinding('style.--chartHeight')
  @Input()
  chartHeight = '';
}
