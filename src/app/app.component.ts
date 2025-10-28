import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  template: `
    <app-navigation></app-navigation>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      padding-top: 80px; /* Adjust based on your header height */
      min-height: calc(100vh - 80px); /* Full viewport height minus header */
    }
    
    @media (max-width: 768px) {
      .main-content {
        padding-top: 60px; /* Adjust for mobile header height */
        min-height: calc(100vh - 60px);
        padding-bottom: 60px; /* Space for mobile bottom nav */
      }
    }
  `]
})
export class AppComponent {
  title = 'lou-muhsineen';
}
