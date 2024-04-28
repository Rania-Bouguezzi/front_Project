import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedsTransferComponent } from './needs-transfer.component';

describe('NeedsTransferComponent', () => {
  let component: NeedsTransferComponent;
  let fixture: ComponentFixture<NeedsTransferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NeedsTransferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NeedsTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
