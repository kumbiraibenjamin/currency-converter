import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'currency-exchanger',
    pathMatch: 'full',
  },
  {
    path: 'currency-exchanger',
    loadChildren: () =>
      import('./currency-exchanger/currency-exchanger.module').then(
        (m) => m.CurrencyExchangerModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
