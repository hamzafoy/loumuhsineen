import { Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Injectable({
    providedIn: "root"
})

export class LayoutService {
    isMobile: boolean | undefined;
    isTablet: boolean | undefined;
    isLaptop: boolean | undefined;
    isLarge: boolean | undefined;
    isXLarge: boolean | undefined;

    constructor(breakpointObserver: BreakpointObserver) {
        breakpointObserver.observe([
            Breakpoints.XSmall,
            Breakpoints.Small,
            Breakpoints.Medium,
            Breakpoints.Large,
            Breakpoints.XLarge
        ]).subscribe(() => {
            if (breakpointObserver.isMatched([Breakpoints.XSmall])) {
                this.isMobile = true;
                this.isTablet = false;
                this.isLaptop = false;
                this.isLarge = false;
                this.isXLarge = false;
            } else if (breakpointObserver.isMatched([Breakpoints.Small])) {
                this.isMobile = false;
                this.isTablet = true;
                this.isLaptop = false;
                this.isLarge = false;
                this.isXLarge = false;
            } else if (breakpointObserver.isMatched([Breakpoints.Medium])) {
                this.isMobile = false;
                this.isTablet = false;
                this.isLaptop = true;
                this.isLarge = false;
                this.isXLarge = false;
            } else if (breakpointObserver.isMatched([Breakpoints.Large])) {
                this.isMobile = false;
                this.isTablet = false;
                this.isLaptop = false;
                this.isLarge = true;
                this.isXLarge = false;
            } else {
                this.isMobile = false;
                this.isTablet = false;
                this.isLaptop = false;
                this.isLarge = false;
                this.isXLarge = true;
            }
        })
    }
}