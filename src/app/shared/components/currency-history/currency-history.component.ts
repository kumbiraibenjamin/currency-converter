import { Component, Input, OnChanges } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { CurrencySymbol } from 'src/app/core/models/symbol.model';

@Component({
  selector: 'app-currency-history',
  templateUrl: './currency-history.component.html',
  styleUrls: ['./currency-history.component.scss'],
})
export class CurrencyHistoryComponent implements OnChanges {
  @Input() data: { months: string[]; result: number[] } | undefined;
  @Input() showgraph = false;
  @Input() toCurrency: CurrencySymbol | undefined;
  @Input() fromCurrency: CurrencySymbol | undefined;

  rateCharts: { chartData: any; chartOptions: any; chartType: any } | undefined;

  ngOnChanges() {
    this.rateCharts = this.generateRateData(this.data);
  }

  generateRateData(
    data: { months: string[]; result: number[] } | undefined
  ): { chartData: any; chartOptions: any; chartType: any } | undefined {
    if (data) {
      const { months, result } = data;
      const chartData: ChartConfiguration['data'] = {
        datasets: [
          {
            data: [...result],
            label: 'Monthly Rate',
            backgroundColor: 'rgba(0,74,159,0.2)',
            borderColor: '#004a9f',
            pointBackgroundColor: '#004a9f',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#000',
            fill: 'origin',
          },
        ],
        labels: [...months],
      };

      const chartOptions: ChartConfiguration['options'] = {
        elements: {
          line: {},
        },
        scales: {
          // We use this empty structure as a placeholder for dynamic theming.
          x: {},
          'y-axis-0': {
            position: 'left',
          },
        },
      };

      const chartType: ChartType = 'line';
      return { chartData, chartOptions, chartType };
    } else {
      return undefined;
    }
  }
}
