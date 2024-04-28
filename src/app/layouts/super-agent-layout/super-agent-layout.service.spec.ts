import { TestBed } from '@angular/core/testing';

import { SuperAgentLayoutService } from './super-agent-layout.service';

describe('SuperAgentLayoutService', () => {
  let service: SuperAgentLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperAgentLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
