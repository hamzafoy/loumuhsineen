import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from "@angular/core";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from "highcharts-angular";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LayoutService } from "../../services/layout.service";

@Component({
    selector: 'app-dashboards',
    templateUrl: './dashboards.component.html',
    styleUrls: ['./dashboards.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        HighchartsChartModule,

        MatProgressSpinnerModule
    ]
})

export class DashboardsComponent implements OnInit, OnDestroy {

    constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: any, private layoutService: LayoutService) {}
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


    // Highcharts configuration
    Highcharts: typeof Highcharts = Highcharts;
    convertsChartOptions: Highcharts.Options = {
        chart: {
            height: 300,
            width: (this.IsMobileViewport || this.IsTabletViewport) ? 350 : 800,
            type: 'column'
        },
        title: {
            text: 'Convert Gift Boxes Inventory'
        },
        xAxis: {
            title: {
                text: 'Gift Box Locations (Masaajid)'
            },
            labels: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Number of Gift Boxes'
            }
        },
        series: [{
            name: 'GLIC',
            data: [],
            type: 'column'
        },
        {
            name: 'AlNur',
            data: [],
            type: 'column'
        },
        {
            name: 'MCC',
            data: [],
            type: 'column'
        },
        {
            name: 'Masjid Bilal South',
            data: [],
            type: 'column'
        }
        ],
        credits: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                return `
                <b>${this.series.name}</b><br/>
                # of Boxes: ${this.y}
                `;
            }
        }
    }
    updateFlag: boolean = false;
    oneToOneFlag: boolean = true;
    isLoading: boolean = true;

    private destroy$ = new Subject<void>();

    ngOnInit(): void {
        //this.isBrowser = isPlatformBrowser(this.platformId);
        this.getConvertGiftBoxes().subscribe((data) => {
            data.value?.forEach((item: any, index: number) => {
                const value = item[0];
                const series = this.convertsChartOptions?.series?.[index] as any;
                if (series) {
                    series.data.push(value);
                }
            })
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getConvertGiftBoxes(): Observable<any> {
            return this.http.get('https://script.google.com/macros/s/AKfycbxyE3SIlkklrujOCmXYKn20UrEfx1bNQFR49TCDkZscosp8CuvfKgeAiRCi65RkCZ0/exec');
    }

}