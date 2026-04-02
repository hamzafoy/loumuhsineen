import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClient } from '@angular/common/http';
import { timer, switchMap, Subject } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, NavigationComponent, FontAwesomeModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}
  private destroy$ = new Subject<void>();
  tickerItems: string[] = [];
  defaultTickerItems: string[] = [
    'The Louisville Muhsineen is proud to serve our local community.',
    'Follow us on Instagram, Facebook, & on YouTube',
    'May Allah bless you and your family with health, happiness, and prosperity.'
  ];

  public faFacebook = faFacebook;
  public faYoutube = faYoutube;
  public faInstagram = faInstagram;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getTickerTape();
    }
  }

  ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

  private getTickerTape(): void {
  timer(0, 5 * 60 * 1000)
    .pipe(
      switchMap(() =>
        this.http.get('https://script.google.com/macros/s/AKfycbxLEBrf_gLJI0CS-oF_8N7ACXztTOWMnBc4BFQIfePaPfxe-EMOUn2M0ooz6JlkGIty/exec')
      )
    )
    .subscribe((response: any) => {
      if (response?.data?.length > 0) {
        this.tickerItems = response.data.map((item: any) => item.message);
      } else {
        this.tickerItems = this.defaultTickerItems;
      }
    });
}

}