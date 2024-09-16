import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { GmailComponent } from './gmail.component';

fdescribe('GmailComponent', () => {
  let component: GmailComponent;
  let fixture: ComponentFixture<GmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GmailComponent],  // Importa si es standalone
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 123 }),  // Mock de parámetros de ruta
            snapshot: { paramMap: { get: (key: string) => '123' } }  // Mock de paramMap en snapshot
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });
});
