import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CurrencyExchangeComponent } from './components/currency-exchange/currency-exchange.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ToastComponent } from './components/toast/toast.component';

import { MaterialsModule } from './modules/materials/materials.module';
import { CurrencyCardComponent } from './components/currency-card/currency-card.component';
import { CurrencyHistoryComponent } from './components/currency-history/currency-history.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { ChartjsContainerComponent } from './components/chartjs-container/chartjs-container.component';

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    NgSelectModule,
    FontAwesomeModule,
    NgChartsModule,
  ],
  declarations: [
    ToastComponent,
    LoaderComponent,
    NavBarComponent,
    CurrencyExchangeComponent,
    CurrencyCardComponent,
    CurrencyHistoryComponent,
    ChartjsContainerComponent,
  ],
  exports: [
    ToastComponent,
    LoaderComponent,
    NavBarComponent,
    CurrencyExchangeComponent,
    CurrencyCardComponent,
    CurrencyHistoryComponent,
    ChartjsContainerComponent,
  ],
  providers: [],
})
export class SharedModule {}
