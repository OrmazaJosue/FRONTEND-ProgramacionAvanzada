import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EscrituraComponent } from './escritura.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

fdescribe('EscrituraComponent', () => {
  let component: EscrituraComponent;
  let fixture: ComponentFixture<EscrituraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EscrituraComponent,
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EscrituraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should display the title "CATALOGO" in the header', () => {
    const headerElement: HTMLElement = fixture.nativeElement.querySelector('.logotipo');
    expect(headerElement.textContent).toContain('CATALOGO');
  });

  fit('should display the correct number of recommended movies', () => {
    const movieElements = fixture.nativeElement.querySelectorAll('.pelicula');
    expect(movieElements.length).toBeGreaterThan(0);
  });

  fit('should have working navigation buttons', () => {
    const navLinks = fixture.nativeElement.querySelectorAll('nav a');
    expect(navLinks.length).toBe(5);
    expect(navLinks[0].textContent).toContain('Inicio');
    expect(navLinks[1].textContent).toContain('Programas');
    expect(navLinks[2].textContent).toContain('Películas');
    expect(navLinks[3].textContent).toContain('Más Recientes');
    expect(navLinks[4].textContent).toContain('Mi lista');
  });

  fit('should have working carousel buttons', () => {
    const leftButton = fixture.nativeElement.querySelector('.flecha-izquierda');
    const rightButton = fixture.nativeElement.querySelector('.flecha-derecha');
    expect(leftButton).toBeTruthy();
    expect(rightButton).toBeTruthy();
  });
});