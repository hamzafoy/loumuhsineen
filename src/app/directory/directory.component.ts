import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../services/layout.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [CommonModule, NavigationComponent, NgbCarousel, NgbSlide, MatProgressSpinner],
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  constructor(private layoutService: LayoutService, private http: HttpClient) { }

  //Layout Service Methods
  get IsMobileViewport() {
    return this.layoutService.isMobile;
  }
  
  get IsTabletViewport() {
    return this.layoutService.isTablet;
  }

  get IsLaptopViewport() {
    return this.layoutService.isLaptop;
  }

  get IsLargeViewport() {
    return this.layoutService.isLarge;
  }

  get IsXLargeViewport() {
    return this.layoutService.isXLarge;
  }
  public layout: string = '';
  public isLoading: boolean = true;
  
  public images: string[] = [
    '../assets/directory_imgs/directory_hamza_foy.png',
    '../assets/directory_imgs/directory_mohamed_ali.png',
    '../assets/directory_imgs/directory_faysal_bulbul.png'
  ]

  public mobileImages : string[] = [
    '../assets/directory_imgs/directory_hamza_foy_mobile.png',
    '../assets/directory_imgs/directory_mohamed_ali_mobile.png',
    '../assets/directory_imgs/directory_faysal_bulbul_mobile.png'
  ]

  ngOnInit(): void {
    if (this.IsMobileViewport || this.IsTabletViewport) {
      this.layout = 'mobile';
    } else {
      this.layout = 'desktop';
    }

    console.log(`Current Layout: ${this.layout}`);

    this.getImages(this.layout).subscribe((response: any) => {
            if (response && response.resources) {
            const sortedResources = this.quickSortResources(response.resources);
            this.images = [];
            this.mobileImages = [];
            sortedResources.forEach((item: any) => {
                this.layout == 'mobile' ? this.mobileImages.push(`https://res.cloudinary.com/dx6zo2qyo/image/upload/v${item.version}/${item.public_id}.${item.format}`) : this.images.push(`https://res.cloudinary.com/dx6zo2qyo/image/upload/v${item.version}/${item.public_id}.${item.format}`);
            });
            this.isLoading = false;
            } else {
              this.isLoading = false;
              console.error('Unexpected API response format:', response);
            }
        })
  }

  getImages(layout: string): Observable<any> {
          return this.http.get(
              `https://res.cloudinary.com/dx6zo2qyo/image/list/directory${layout}.json`
          );
      }

  quickSortResources(arr: any[]): any[] {
    if (arr.length <= 1) return arr;

    const pivot = arr[arr.length - 1];
    const left: any[] = [];
    const right: any[] = [];

    for (let i = 0; i < arr.length - 1; i++) {
      const current = arr[i];

      if (current.public_id.localeCompare(pivot.public_id) < 0) {
        left.push(current);
      } else {
        right.push(current);
      }
    }

    return [
      ...this.quickSortResources(left),
      pivot,
      ...this.quickSortResources(right)
    ];
  }

}