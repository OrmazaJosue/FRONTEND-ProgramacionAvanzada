import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  private currentUser: string | null = null;

  private validUsers = [
    { username: 'Admin', password: '73188d55afc05b6389bdbea6a55a9f4b' },
    { username: 'Josue', password: 'ormaza' },
    { username: 'Steven', password: 'riofrio' },
    { username: 'Maria', password: 'b8e7be5dfa2ce0714d21dcfc7d72382c' }
  ];

  // Se deberia cambiar las contraseñas por hash para mayor seguridad y esto deberia estar en BD, por fines educativos se dejo asi

  constructor(private router: Router) { }

  login(username: string, password: string): boolean {
    const user = this.validUsers.find(u => u.username === username && u.password === password);

    if (user) {
      this.isLoggedIn = true;
      this.currentUser = username;
      return true;
    } else {
      this.isLoggedIn = false;
      this.currentUser = null;
      return false;
    }
  }

  logout() {
    this.isLoggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  getLoggedInUser(): string | null {
    return this.currentUser;
  }

}

