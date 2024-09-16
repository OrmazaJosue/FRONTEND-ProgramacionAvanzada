import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, RouterOutlet ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {

  isNavActive: boolean = false;
  loggedInUser: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
  }

  toggleNav(): void {
    this.isNavActive = !this.isNavActive;
  }

  navigateToNav() {
    this.router.navigateByUrl('/nav');
  }

  }

  /*isNavActive = false;
  isAdmin = false;
  isUser = false;
  loggedInUser: { username: string, role: string } | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUser = this.authService.getLoggedInUser();
    this.isAdmin = this.authService.isAdmin();
    this.isUser = this.authService.isUser();
  }

  toggleNav(): void {
    this.isNavActive = !this.isNavActive;
  }

  navigateToNav() {
    this.router.navigateByUrl('/nav');
  }
}*/