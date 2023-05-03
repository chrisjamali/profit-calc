import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { EsppProfitFormComponent } from './espp-profit-form/espp-profit-form.component';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { CheckQualifyService } from './services/check-qualify/check-qualify.service';
import { TaxService } from './services/tax-service/tax.service';
import { TotalPriceService } from './services/total-price.service';
import { DatePipe } from '@angular/common';
import { AutoDecimalDirective } from './directives/auto-decimal.directive';

const moment = _moment;
@NgModule({
  declarations: [AppComponent, EsppProfitFormComponent, AutoDecimalDirective],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [
    {
      provide: MAT_RADIO_DEFAULT_OPTIONS,
      useValue: { color: 'primary' },
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    CheckQualifyService,
    TaxService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
