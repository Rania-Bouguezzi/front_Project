import { TestBed } from '@angular/core/testing';

import { DriverLayoutService } from './driver-layout.service';

describe('DriverLayoutService', () => {
  let service: DriverLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
