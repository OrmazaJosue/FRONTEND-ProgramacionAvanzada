import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenegadoSolicitudComponent } from './denegado-solicitud.component';

fdescribe('DenegadoSolicitudComponent', () => {
  let component: DenegadoSolicitudComponent;
  let fixture: ComponentFixture<DenegadoSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DenegadoSolicitudComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DenegadoSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
