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

@NgModule({
  imports: [
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    NgSelectModule,
    FontAwesomeModule,
  ],
  declarations: [
    ToastComponent,
    LoaderComponent,
    NavBarComponent,
    CurrencyExchangeComponent,
    CurrencyCardComponent,
    CurrencyHistoryComponent,
  ],
  exports: [
    ToastComponent,
    LoaderComponent,
    NavBarComponent,
    CurrencyExchangeComponent,
    CurrencyCardComponent,
    CurrencyHistoryComponent,
  ],
  providers: [],
})
export class SharedModule {}
