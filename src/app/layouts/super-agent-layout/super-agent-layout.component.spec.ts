import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAgentLayoutComponent } from './super-agent-layout.component';

describe('SuperAgentLayoutComponent', () => {
  let component: SuperAgentLayoutComponent;
  let fixture: ComponentFixture<SuperAgentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperAgentLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAgentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
