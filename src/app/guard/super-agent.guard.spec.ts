import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { superAgentGuard } from './super-agent.guard';

describe('superAgentGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => superAgentGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
