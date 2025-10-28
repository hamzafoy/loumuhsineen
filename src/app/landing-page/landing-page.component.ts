import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  tickerItems: string[] = [
    'Welcome to LouMuhsineen',
    'New Arrivals Coming Soon',
    'Special Offers Available',
    'Join Our Community',
    'Follow Us on Social Media'
  ];

  constructor() { }

  ngOnInit(): void {
  }
}
