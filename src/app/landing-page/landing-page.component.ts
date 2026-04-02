import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  constructor(private http: HttpClient) {}

  tickerItems: string[] = [
    'The Louisville Muhsineen is proud to serve our local community.',
    'Follow us on Instagram, Facebook, & on YouTube',
    'May Allah bless you and your family with health, happiness, and prosperity.'
  ];

  ngOnInit(): void {
    this.getTickerTape();
  }

  private getTickerTape(): void {
    this.http.get('https://script.google.com/macros/s/AKfycbxLEBrf_gLJI0CS-oF_8N7ACXztTOWMnBc4BFQIfePaPfxe-EMOUn2M0ooz6JlkGIty/exec')
      .subscribe((response: any) => {
        console.log(`Ticker Tape API RESPONSE: `, response);
        if (response?.data?.length > 0) {
          this.tickerItems = [];
          response.data?.forEach((item: any) => {
            this.tickerItems.push(item.message);
          })
        }
      });
  }

}