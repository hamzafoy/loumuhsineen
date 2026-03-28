import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '../navigation/navigation.component';


@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, NavigationComponent],
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']

})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}