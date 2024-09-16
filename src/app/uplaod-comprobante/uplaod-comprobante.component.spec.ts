import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UplaodComprobanteComponent } from './uplaod-comprobante.component';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('UplaodComprobanteComponent', () => {
  let component: UplaodComprobanteComponent;
  let fixture: ComponentFixture<UplaodComprobanteComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, UplaodComprobanteComponent], // Importar el componente standalone aquí
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: () => null }), // Mocked value
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UplaodComprobanteComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should upload file and track progress', () => {
  const mockFile = new File(['file content'], 'test.txt', { type: 'text/plain' });

  // Simulate file input event
  const event = {
    target: {
      files: [mockFile]
    }
  } as unknown as Event;

  // Manually trigger the file input handling
  component.handleFileInput(event);

  // Ensure file is loaded correctly
  expect(component.uploadedFileUrl).toContain('data:text/plain;base64');

  // Set the form control with the mock file and trigger upload
  component.uploadForm.get('comprobante')?.setValue(mockFile);
  component.uploadComprobante();

  const req = httpTestingController.expectOne('http://localhost:3001/upload-comprobante');
  expect(req.request.method).toBe('POST');

  // Simulate upload progress
  req.event({
    type: HttpEventType.UploadProgress,
    loaded: 50,
    total: 100
  });

  expect(component.uploadProgress).toBe(50);

  // Simulate upload success
  req.event(new HttpResponse({ status: 200 }));

  expect(component.uploading).toBeFalse();
  httpTestingController.verify();
});
});