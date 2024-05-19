import { TestBed } from '@angular/core/testing';

import { AgencyProfileService } from './agency-profile.service';

describe('AgencyProfileService', () => {
  let service: AgencyProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
