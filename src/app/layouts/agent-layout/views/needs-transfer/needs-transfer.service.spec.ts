import { TestBed } from '@angular/core/testing';

import { NeedsTransferService } from './needs-transfer.service';

describe('NeedsTransferService', () => {
  let service: NeedsTransferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeedsTransferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
