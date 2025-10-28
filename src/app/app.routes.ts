import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, pathMatch: 'full' },
  { path: 'about', component: AboutUsComponent, title: 'About Us' },
  { path: 'calendar', component: CalendarComponent, title: 'Community Calendar' },
  // Add more routes here as needed
];
