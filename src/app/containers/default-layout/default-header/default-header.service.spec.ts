import { TestBed } from '@angular/core/testing';

import { DefaultHeaderService } from './default-header.service';

describe('DefaultHeaderService', () => {
  let service: DefaultHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
