// import { TestBed } from '@angular/core/testing';

// import { CheckQualifyService } from './check-qualify.service';

// describe('CheckQualifyService', () => {
//   let service: CheckQualifyService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(CheckQualifyService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import * as moment from 'moment';
import { CheckQualifyService } from './check-qualify.service';

describe('CheckQualifyService', () => {
  let service: CheckQualifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckQualifyService],
    });
    service = TestBed.inject(CheckQualifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('checkQualify', () => {
    it('should return true if offer date is more than 2 years ago', () => {
      const offerDate = moment().subtract(2, 'years').subtract(1, 'day');
      expect(service.checkQualify(offerDate)).toBe(true);
    });

    it('should return false if offer date is less than 2 years ago', () => {
      const offerDate = moment().subtract(1, 'year');
      expect(service.checkQualify(offerDate)).toBe(false);
    });
  });

  describe('checkCapitalGains', () => {
    it('should return true if purchase date is more than 1 year ago', () => {
      const purchaseDate = moment().subtract(1, 'year').subtract(1, 'day');
      expect(service.checkCapitalGains(purchaseDate)).toBe(true);
    });

    it('should return false if purchase date is less than 1 year ago', () => {
      const purchaseDate = moment().subtract(6, 'months');
      expect(service.checkCapitalGains(purchaseDate)).toBe(false);
    });
  });
});
