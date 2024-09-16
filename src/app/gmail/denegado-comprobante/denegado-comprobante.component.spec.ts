import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenegadoComprobanteComponent } from './denegado-comprobante.component';

fdescribe('DenegadoComprobanteComponent', () => {
  let component: DenegadoComprobanteComponent;
  let fixture: ComponentFixture<DenegadoComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenegadoComprobanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenegadoComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
