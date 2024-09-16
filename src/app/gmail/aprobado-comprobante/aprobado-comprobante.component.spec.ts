import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AprobadoComprobanteComponent } from './aprobado-comprobante.component';

fdescribe('AprobadoComprobanteComponent', () => {
  let component: AprobadoComprobanteComponent;
  let fixture: ComponentFixture<AprobadoComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AprobadoComprobanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AprobadoComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
