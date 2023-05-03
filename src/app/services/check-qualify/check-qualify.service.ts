import { Injectable } from '@angular/core';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root',
})
export class CheckQualifyService {
  

  checkQualify(offerDate: moment.Moment): boolean {
    const today = moment();
    const diffYears = Math.abs(
      moment.duration(offerDate.diff(today)).asYears()
    );

    return diffYears >= 2;
  }
  checkCapitalGains(purchaseDate: moment.Moment): boolean {
    const today = moment();
    const diffYears = Math.abs(
      moment.duration(purchaseDate.diff(today)).asYears()
    );

    return diffYears >= 1;
  }
}
