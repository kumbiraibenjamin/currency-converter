import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { CurrencyDetailComponent } from './pages/currency-detail/currency-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CurrencyExchangerRoutingModule } from './currency-exchanger-routing.module';

@NgModule({
  declarations: [HomeComponent, CurrencyDetailComponent],
  imports: [
    CommonModule,
    CurrencyExchangerRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class CurrencyExchangerModule {}
