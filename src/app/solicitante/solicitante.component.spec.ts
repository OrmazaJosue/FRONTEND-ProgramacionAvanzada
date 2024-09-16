import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitanteComponent } from './solicitante.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('SolicitanteComponent', () => {
  let component: SolicitanteComponent;
  let fixture: ComponentFixture<SolicitanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SolicitanteComponent // Importar en lugar de declarar
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a list of solicitantes in the table', () => {
    const testSolicitantes = [
      { 
        id: 1, 
        nombre: 'John', 
        apellido: 'Doe', 
        fechaNacimiento: new Date(), 
        numeroCedula: '123456789', 
        estadoCivil: 'Soltero', 
        coloniaBarrio: 'Centro', 
        ciudad: 'Ciudad', 
        estadoProvincia: 'Provincia', 
        telefono: '555-5555', 
        correoElectronico: 'john.doe@example.com', 
        tipoTerreno: 'Residencial', 
        documentosAdjuntos: 'N/A', 
        estado: 'Pendiente' 
      },
      // Añade más objetos de prueba si es necesario
    ];

    component.solicitantes = testSolicitantes;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(testSolicitantes.length);
    expect(rows[0].nativeElement.textContent).toContain(testSolicitantes[0].nombre);
    expect(rows[0].nativeElement.textContent).toContain(testSolicitantes[0].apellido);
    // Verifica otros campos según sea necesario
  });
});