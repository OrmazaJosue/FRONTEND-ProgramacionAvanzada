import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, FormsModule],
  templateUrl: './register-component.component.html',
  styleUrl: './register-component.component.css'
})
export class RegisterComponentComponent implements OnInit {
  @ViewChild('carouselContainer', { static: true }) carouselContainer!: ElementRef;
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  images = [
    { src: '/1.jpeg', alt: 'Terreno 1' },
    { src: '/2.jpeg', alt: 'Terreno 2' },
    { src: '/3.jpeg', alt: 'Terreno 3' },
    { src: '/4.jpeg', alt: 'Terreno 4' },
    { src: '/5.jpeg', alt: 'Terreno 5' },
    { src: '/6.jpeg', alt: 'Terreno 6' },
    { src: '/7.jpeg', alt: 'Terreno 7' },
    { src: '/8.jpeg', alt: 'Terreno 8' },
    { src: '/9.jpeg', alt: 'Terreno 9' },
    { src: '/10.jpeg', alt: 'Terreno 10' }
  ];

  translateX = 0;
  slideWidth = 0;
  intervalId: any;

  ngOnInit() {
    this.initializeCarousel();
  }

  initializeCarousel() {
    setTimeout(() => {
      this.slideWidth = this.carouselContainer.nativeElement.offsetWidth / 3; // Adjust slide width based on visible items
      this.startCarousel();
    }, 0);
  }

  startCarousel() {
    this.intervalId = setInterval(() => {
      this.translateX -= this.slideWidth;
      if (Math.abs(this.translateX) >= this.slideWidth * 3) {
        this.images.push(this.images.shift()!);
        this.translateX += this.slideWidth;
      }
    }, 3000);
  }

  moveCarousel(direction: 'left' | 'right') {
    const maxTranslateX = (this.images.length - 3) * this.slideWidth;
    if (direction === 'left') {
      this.translateX -= this.slideWidth;
      if (Math.abs(this.translateX) >= maxTranslateX) {
        this.images.push(this.images.shift()!);
        this.translateX += this.slideWidth;
      }
    } else {
      this.translateX += this.slideWidth;
      if (this.translateX > 0) {
        this.images.unshift(this.images.pop()!);
        this.translateX -= this.slideWidth;
      }
    }
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}