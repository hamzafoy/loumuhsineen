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
    { path: '/calendar', label: 'Calendar' }
  ];

  constructor() {
    // Use setTimeout to ensure this runs only in the browser
    if (typeof window !== 'undefined') {
      this.checkViewport();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (typeof window !== 'undefined') {
      this.checkViewport();
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  private checkViewport() {
    if (typeof window !== 'undefined') {
      this.isMobileView = window.innerWidth < 768;
      if (!this.isMobileView) {
        this.isMobileMenuOpen = false;
      }
    }
  }
}
