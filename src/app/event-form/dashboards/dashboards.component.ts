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

    totalBoxes: number = 0;
    totalFunds: number = 0;

    // Highcharts configuration
    Highcharts: typeof Highcharts = Highcharts;
    chartRef!: Highcharts.Chart;
    chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
        this.chartRef = chart;
    }
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
        yAxis: [
            {
                title: { text: 'Number of Gift Boxes' }
            },
            {
                visible: false,
                min: 0,
                max: 10
            }
        ],
        series: [{
            name: 'GLIC',
            data: [],
            type: 'column',
            yAxis: 0
        },
        {
            name: 'AlNur',
            data: [],
            type: 'column',
            yAxis: 0
        },
        {
            name: 'MCC',
            data: [],
            type: 'column',
            yAxis: 0
        },
        {
            name: 'Masjid Bilal South',
            data: [],
            type: 'column',
            yAxis: 0
        },
        {
            type: 'column',
            name: undefined,
            data: [95], // KPI
            yAxis: 1,   // 👈 separate axis
            color: 'transparent',
            showInLegend: false,
            enableMouseTracking: false,
            dataLabels: {
            enabled: true,
            align: 'right',
            verticalAlign: 'top',
            x: 50,
            y: -20,
            formatter: () => {
                return `<b style="font-size:16px">$${this.totalFunds}</b><br/><i style="font-size:12px">Funds</i><br/><b style="font-size:16px">${this.totalBoxes}</b><br/><i style="font-size:12px">Total Boxes</i>`;
            },
            useHTML: true,
            inside: true
            }
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
                if (series && index < 4) {
                    series.data.push(value);
                } else {
                    index == 4 ? this.totalBoxes = value : this.totalFunds = value.toFixed(2);
                }
            })
            if (this.chartRef) {
                const kpiSeries = this.chartRef.series[4] as any;
                if (kpiSeries) {
                    kpiSeries.update({}, false);
                    this.chartRef.redraw();
                }
            }
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    getConvertGiftBoxes(): Observable<any> {
            return this.http.get('https://script.google.com/macros/s/AKfycbwMxHI-h2YvU7MwHBArg983G3FDbZ69MmS1psC82jt8Zapj5HfTXO1uPHRvecDXNY35/exec');
    }

}