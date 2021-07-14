import { TestBed } from '@angular/core/testing';

import { VspPerticularShowSeatDetailService } from './vsp-perticular-show-seat-detail.service';

describe('VspPerticularShowSeatDetailService', () => {
  let service: VspPerticularShowSeatDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VspPerticularShowSeatDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
