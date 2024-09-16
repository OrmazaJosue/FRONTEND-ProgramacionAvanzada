import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PropertyCardComponent } from './property-card.component';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('PropertyCardComponent', () => {
  let component: PropertyCardComponent;
  let fixture: ComponentFixture<PropertyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PropertyCardComponent,  // Importa el componente standalone en lugar de declararlo
        RouterTestingModule     // Importa el RouterTestingModule para manejar las rutas
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the header with the title "LAND MANAGER"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const headerTitle = compiled.querySelector('h2.logotipo');
    expect(headerTitle?.textContent).toContain('LAND MANAGER');
  });

  it('should render navigation links with correct text', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('nav a'));
    expect(navLinks.length).toBe(3);
    expect(navLinks[0].nativeElement.textContent).toContain('Inicio');
    expect(navLinks[1].nativeElement.textContent).toContain('Catálogo');
    expect(navLinks[2].nativeElement.textContent).toContain('Formulario');
  });

  it('should display at least one property item with a description and price', () => {
    const items = fixture.debugElement.queryAll(By.css('.item'));
    expect(items.length).toBeGreaterThan(0);
    const firstItem = items[0];
    const description = firstItem.query(By.css('.descripcion')).nativeElement.textContent;
    const price = firstItem.query(By.css('.precio')).nativeElement.textContent;
    expect(description).toBeTruthy();
    expect(price).toBeTruthy();
  });

  it('should display the footer with the correct text', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const footerText = compiled.querySelector('footer h5');
    expect(footerText?.textContent).toContain('Elaborado por ITIN ESPE 2024');
  });

  it('should have social media links in the footer', () => {
    const socialLinks = fixture.debugElement.queryAll(By.css('.social-media a'));
    expect(socialLinks.length).toBe(4);
    const socialIcons = ['facebook-f', 'twitter', 'instagram', 'linkedin-in'];
    socialIcons.forEach((icon, index) => {
      expect(socialLinks[index].nativeElement.innerHTML).toContain(icon);
    });
  });
});
