import { TestBed } from '@angular/core/testing';

import { CustomerLayoutService } from './customer-layout.service';

describe('CustomerLayoutService', () => {
  let service: CustomerLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
