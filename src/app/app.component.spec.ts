import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

fdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent]  // Importamos el componente standalone
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  fit(`should have the title 'Avanzada_GP6'`, () => {
    expect(component.title).toEqual('Avanzada_GP6');
  });

  fit('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('Hello, Avanzada_GP6');
  });
});
