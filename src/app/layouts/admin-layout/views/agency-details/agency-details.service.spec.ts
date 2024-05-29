import { TestBed } from '@angular/core/testing';

import { AgencyDetailsService } from './agency-details.service';

describe('AgencyDetailsService', () => {
  let service: AgencyDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
