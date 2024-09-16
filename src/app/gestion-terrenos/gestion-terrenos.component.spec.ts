import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { GestionTerrenosComponent } from './gestion-terrenos.component';

fdescribe('GestionTerrenosComponent', () => {
  let component: GestionTerrenosComponent;
  let fixture: ComponentFixture<GestionTerrenosComponent>;


  beforeEach(async () => {
    // Crea un mock del TerrenoService
    const spy = jasmine.createSpyObj('TerrenoService', ['getTerreno', 'updateTerreno']);

    await TestBed.configureTestingModule({
      imports: [GestionTerrenosComponent],
      providers: [ 
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }),
            snapshot: { paramMap: { get: (key: string) => '123' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionTerrenosComponent);
    component = fixture.componentInstance;

  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should load terreno data on init', fakeAsync(() => {
    //const mockTerreno = { id: 123, nombre: 'Terreno Test' };

    fixture.detectChanges(); // Dispara ngOnInit
    tick(); // Simula la espera de cualquier llamada asíncrona


  }));

  fit('should display terreno name', () => {
    //const mockTerreno = { id: 123, nombre: 'Terreno Test' };


    fixture.detectChanges(); // Actualiza el DOM

    const nameElement = fixture.debugElement.query(By.css('h2'));
    //expect(nameElement.nativeElement.textContent).toContain('Terreno Test'); // Verifica que el nombre se muestre correctamente
  });
});
