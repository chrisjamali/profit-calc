import { TestBed } from '@angular/core/testing';

import { CheckQualifyService } from './check-qualify.service';

describe('CheckQualifyService', () => {
  let service: CheckQualifyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckQualifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
