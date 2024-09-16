import { Component, Output,  EventEmitter  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(public authService: AuthService, private router: Router) {}

  username: string = '';
  password: string = '';
  loginMessage: string = '';

  login() {
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    const isLoggedIn = this.authService.login(this.username, this.password);
    if (isLoggedIn) {
      console.log('Autenticación exitosa!');
      this.router.navigate(['/nav']);
      this.loginEvent.emit(true);
    } else {
      console.error('Error autenticando');
      this.loginMessage = 'Usuario no registrado o contraseña incorrecta';
    }
  }
}
   /* @Output() loginEvent = new EventEmitter<boolean>();


    constructor(public authService: AuthService, private router: Router) { }

    username: string = '';
    password: string = '';
    loginMessage: string = '';

    login() {
      console.log('Username:', this.username);
      console.log('Password:', this.password);

      const isLoggedIn = this.authService.login(this.username, this.password);
      if (isLoggedIn) {
        console.log('Autenticación exitosa!');
        const userRole = this.authService.getUserRole();
        if (userRole === 'admin') {
          this.router.navigate(['/nav']); // Redirige a la página de admin
        } else if (userRole === 'user') {
          this.router.navigate(['/formulario']); // Redirige a la página de usuario
        }
        this.loginEvent.emit(true);
      } else {
        console.error('Error autenticando');
        this.loginMessage = 'Usuario no registrado o contraseña incorrecta';
      }
    }

}*/