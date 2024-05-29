import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAgentComponent } from './super-agent.component';

describe('SuperAgentComponent', () => {
  let component: SuperAgentComponent;
  let fixture: ComponentFixture<SuperAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAgentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
