import { TestBed } from '@angular/core/testing';

import { ShowSeatPricesService } from './show-seat-prices.service';

describe('ShowSeatPricesService', () => {
  let service: ShowSeatPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowSeatPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
