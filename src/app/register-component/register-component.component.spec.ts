import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { RegisterComponentComponent } from './register-component.component';

describe('RegisterComponentComponent', () => {
  let component: RegisterComponentComponent;
  let fixture: ComponentFixture<RegisterComponentComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponentComponent]  // Usa imports en lugar de declarations para componentes standalone
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponentComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header with the correct title', () => {
    const header = de.query(By.css('header .logotipo')).nativeElement;
    expect(header.textContent).toContain('LAND MANAGER');
  });

  it('should render the mission card with the correct text', () => {
    const missionCard = de.query(By.css('.mission-card .card-header h3')).nativeElement;
    expect(missionCard.textContent).toBe('Misión');
  });

  it('should render the vision card with the correct text', () => {
    const visionCard = de.query(By.css('.vision-card .card-header h3')).nativeElement;
    expect(visionCard.textContent).toBe('Visión');
  });

  it('should render the footer with the correct text', () => {
    const footer = de.query(By.css('footer .container h5')).nativeElement;
    expect(footer.textContent).toBe('Elaborado por ITIN ESPE 2024');
  });
});
