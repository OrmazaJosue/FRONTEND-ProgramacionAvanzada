import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavSolicutdCatalogoComponent } from './nav-solicutd-catalogo.component';

fdescribe('NavSolicutdCatalogoComponent', () => {
  let component: NavSolicutdCatalogoComponent;
  let fixture: ComponentFixture<NavSolicutdCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavSolicutdCatalogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavSolicutdCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
