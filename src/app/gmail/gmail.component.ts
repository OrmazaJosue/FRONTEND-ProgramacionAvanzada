import { Component, OnInit, } from '@angular/core';
import {   RouterLink, RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-gmail',
  standalone: true,
  imports: [ RouterLink, RouterOutlet],
  templateUrl: './gmail.component.html',
  styleUrl: './gmail.component.css',

})
export class GmailComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

}
