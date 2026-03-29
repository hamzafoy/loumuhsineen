import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DirectoryComponent } from './directory/directory.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent, title: 'Home', pathMatch: 'full' },
  { path: 'about', component: AboutUsComponent, title: 'About Us' },
  { path: 'calendar', component: CalendarComponent, title: 'Community Calendar' },
  { path: 'gallery', component: GalleryComponent, title: 'Photo Gallery' },
  { path: 'directory', component: DirectoryComponent, title: 'Member Directory'}
];
