import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chartjs-container',
  templateUrl: './chartjs-container.component.html',
  styleUrls: ['./chartjs-container.component.scss']
})
export class ChartjsContainerComponent implements OnInit {
  @Input() data: any;
  @Input() options: any;
  @Input() type: any;

  @HostBinding("style.--chartWidth")
  @Input() chartWidth: string = '';

  @HostBinding("style.--chartHeight")
  @Input() chartHeight: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
