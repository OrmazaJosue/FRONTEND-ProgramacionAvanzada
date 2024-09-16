import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComprobanteComponent } from './upload-comprobante.component';

fdescribe('UploadComprobanteComponent', () => {
  let component: UploadComprobanteComponent;
  let fixture: ComponentFixture<UploadComprobanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadComprobanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadComprobanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
