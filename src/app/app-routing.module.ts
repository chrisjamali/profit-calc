import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EsppProfitFormComponent } from './espp-profit-form/espp-profit-form.component';
const routes: Routes = [
  {
    // path: 'espp-profits',
    // loadChildren: () =>
    //   import('./espp-profit-form/espp-profits-form.component').then(
    //     (m) => m.EsppProfitsFormComponent
    //   ),

    path: 'old',
    component: EsppProfitFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
