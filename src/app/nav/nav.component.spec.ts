import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavComponent } from './nav.component';
import { AuthService } from '../auth.service';

fdescribe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getLoggedInUser']);

    await TestBed.configureTestingModule({
      imports: [NavComponent, RouterTestingModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }]
    }).compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  fit('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('should initialize with correct user data', () => {
    const mockUser = 'TestUser';
    authService.getLoggedInUser.and.returnValue(mockUser);

    fixture.detectChanges(); // Triggers ngOnInit

    expect(component.loggedInUser).toBe(mockUser);
  });

  fit('should toggle nav correctly', () => {
    expect(component.isNavActive).toBeFalse();

    component.toggleNav();
    expect(component.isNavActive).toBeTrue();

    component.toggleNav();
    expect(component.isNavActive).toBeFalse();
  });
});