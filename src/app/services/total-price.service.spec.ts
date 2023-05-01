import { TestBed } from '@angular/core/testing';

import { TotalPriceService } from './total-price.service';

describe('TotalPriceService', () => {
  let service: TotalPriceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TotalPriceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
