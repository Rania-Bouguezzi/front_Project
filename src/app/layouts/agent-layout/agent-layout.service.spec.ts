import { TestBed } from '@angular/core/testing';

import { AgentLayoutService } from './agent-layout.service';

describe('AgentLayoutService', () => {
  let service: AgentLayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgentLayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
