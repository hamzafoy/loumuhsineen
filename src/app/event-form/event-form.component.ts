import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

export interface IPublicEventFormModel {
    name: string,
    phone: string,
    email: string,
    events: string[],
    suggestion: string,
}

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, RouterModule, NavigationComponent, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule],
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.css']
})
export class EventFormComponent implements OnInit, OnDestroy {
  
constructor(private http: HttpClient) {}

private destroy$ = new Subject<void>();
newEvent: IPublicEventFormModel = {
    name: '',
    phone: '',
    email: '',
    events: [],
    suggestion: ''
};

ngOnInit(): void {
    
}

ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
}

submitEvent() {
    const formData = new FormData();
    formData.append('entry.419617279', this.newEvent.name);
    formData.append('entry.803451741', this.newEvent.phone);
    formData.append('entry.1211675322', this.newEvent.email);
    this.newEvent.events.forEach(event => {
        formData.append('entry.524808541', event);
    });
    formData.append('entry.1930059198', this.newEvent.suggestion);

    fetch('https://docs.google.com/forms/d/e/1FAIpQLScWSymoKmzrxdUduJwiB-3ZlFODXCRvOEPalLBt14RoXcDnOQ/formResponse', {
    method: 'POST',
    mode: 'no-cors',
    body: formData
    });

    this.newEvent = {
        name: '',
        phone: '',
        email: '',
        events: [],
        suggestion: ''
    };
}


}
