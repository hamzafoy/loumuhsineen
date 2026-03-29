import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { NgbCarousel, NgbSlide } from '@ng-bootstrap/ng-bootstrap';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [CommonModule, NavigationComponent, NgbCarousel, NgbSlide],
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

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
  
  public images: string[] = [
    '/public/directory_imgs/directory_hamza_foy.png',
    '/public/directory_imgs/directory_hamza_foy.png',
    '/public/directory_imgs/directory_hamza_foy.png'
  ]

  ngOnInit(): void {
  }
}