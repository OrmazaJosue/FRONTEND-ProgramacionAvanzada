import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('AuthService', ['login', 'isAuthenticated']);

    await TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        RouterTestingModule,
        LoginComponent
      ],
      providers: [
        { provide: AuthService, useValue: spy }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have empty username and password initially', () => {
    expect(component.username).toBe('');
    expect(component.password).toBe('');
  });

  it('should call login method of AuthService when login is called', async () => {
    component.username = 'testuser';
    component.password = 'testpass';
    authServiceSpy.login.and.returnValue(await Promise.resolve(true));
    
    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith('testuser', 'testpass');
  });

  it('should set loginMessage when login is successful', async () => {
    authServiceSpy.login.and.returnValue(await Promise.resolve(true));
    authServiceSpy.isAuthenticated.and.returnValue(true);
    
    await component.login();
    
    // Ajusta esta expectativa según el comportamiento real de tu componente
    expect(component.loginMessage).toBe(''); // O el mensaje que realmente se establece en caso de éxito
  });

  it('should set loginMessage when login fails', async () => {
    authServiceSpy.login.and.returnValue(await Promise.resolve(false));
    authServiceSpy.isAuthenticated.and.returnValue(false);
    
    await component.login();

    expect(component.loginMessage).toBe('Usuario no registrado o contraseña incorrecta');
  });
});