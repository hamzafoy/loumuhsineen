import { AfterViewInit, Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';
import { fromEvent, Observable, Subject } from 'rxjs';
import { takeUntil, throttleTime } from 'rxjs/operators';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SimpleModalComponent } from './simple-modal/simple-modal.component';
import { HttpClient } from '@angular/common/http';

export interface GalleryImage {
  id: number;
  url: string;
  title: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule, SimpleModalComponent, NavigationComponent],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, OnDestroy, AfterViewInit {
    constructor(private http: HttpClient) {}

    @ViewChild('scrollContainer') scrollContainer!: ElementRef;

    images: GalleryImage[] = [];
    isLoading = false;
    isModalOpen = false;
    selectedImage: GalleryImage | null = null;
    private destroy$ = new Subject<void>();
    private currentPage = 1;
    private readonly imagesPerPage = 12;

    ngOnInit(): void {
        this.getImages().subscribe((response: any) => {
            if (response && response.resources) {
            this.images = response.resources.map((item: any, index: number) => ({
                id: index + 1,
                url: `https://res.cloudinary.com/dx6zo2qyo/image/upload/v${item.version}/${item.public_id}.${item.format}`,
                title: item.context?.custom?.Title || 'Louisville Muhsineen'
            }));
            } else {
                console.error('Unexpected API response format:', response);
            }
        })
        this.getTickerTape().subscribe((response: any) => {
            console.log(`Ticker Tape API RESPONSE: `, response);
        });
    }

    ngAfterViewInit(): void {
    this.setupInfiniteScroll();
    }

    ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    }



    private setupInfiniteScroll(): void {
    if (!this.scrollContainer) return;

    fromEvent(this.scrollContainer.nativeElement, 'scroll')
        .pipe(
        throttleTime(200),
        takeUntil(this.destroy$)
        )
        .subscribe(() => {
        this.checkScroll();
        });
    }

    private checkScroll(): void {
    const element = this.scrollContainer.nativeElement;
    const atBottom = element.scrollHeight - element.scrollTop <= element.clientHeight + 100;

    if (atBottom && !this.isLoading) {
        this.loadImages();
    }
    }

    private loadImages(): void {
    if (this.isLoading) return;

    this.isLoading = true;

    // Simulate API call delay
    setTimeout(() => {
        this.images = [...this.images, ...this.images];
        this.currentPage++;
        this.isLoading = false;
    }, 100);
    }

    openImageModal(image: GalleryImage): void {
    this.selectedImage = image;
    this.isModalOpen = true;
    }

    closeModal(): void {
    this.isModalOpen = false;
    this.selectedImage = null;
    }

    trackByImageId(index: number, image: GalleryImage): number {
    return image.id;
    }

    getImages(): Observable<any> {
        return this.http.get(
            'https://res.cloudinary.com/dx6zo2qyo/image/list/muhsineen.json'
        );
    }

    getTickerTape(): Observable<any> {
        return this.http.get('https://script.google.com/macros/s/AKfycbxLEBrf_gLJI0CS-oF_8N7ACXztTOWMnBc4BFQIfePaPfxe-EMOUn2M0ooz6JlkGIty/exec');
    }

}