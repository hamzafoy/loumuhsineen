import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  isMobileMenuOpen = false;
  isMobileView = false;

  // Navigation items
  navItems = [
    { path: '/about', label: 'About Us' },
    { path: '/gallery', label: 'Photo Gallery' },
    { path: '/directory', label: 'Member Directory' },
    { path: '/events', label: 'Supporting Our Community' },
    { path: '/calendar', label: 'Calendar' }
  ];

  constructor() {
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

}
