import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

// Event type with additional properties
interface CalendarEvent extends EventInput {
  title: string;
  start: Date;
  end: Date;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  extendedProps?: {
    description?: string;
    location?: string;
  };
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule, FullCalendarModule, NavigationComponent],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient) {}

  @ViewChild('calendar') calendarComponent: any;
  eventList: CalendarEvent[] = [];
  private destroy$ = new Subject<void>();

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,listWeek'
    },
    events: [],
    eventClick: this.handleEventClick.bind(this),
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: 'short',
      hour12: true
    },
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: 2,
    height: '700px'
  };

  selectedEvent: any = null;

  ngOnInit(): void {
    this.getCalendarEvents().subscribe((events: any) => {
      console.log(`RESPONSE FROM CALENDAR API:`, events);
      events.data?.forEach((event: any) => {
        let newEvent: CalendarEvent = {
          backgroundColor: '#1e90ff',
          borderColor: '#1e90ff',
          textColor: '#ffffff',
          title: event.title,
          start: event.start,
          end: event.end,
          extendedProps: {
            description: event.description,
            location: event.location
          }
        }
        this.eventList.push(newEvent);
      });
      this.calendarOptions.events = this.eventList;
    });
  }

  ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

  // Handle event click
  handleEventClick(clickInfo: EventClickArg) {
    this.selectedEvent = {
      ...clickInfo.event.toPlainObject(),
      extendedProps: clickInfo.event.extendedProps
    };
    clickInfo.jsEvent.preventDefault();
  }
  
  // Close modal
  closeModal() {
    this.selectedEvent = null;
  }

  // Check if event is all day
  isAllDay(event: any): boolean {
    if (!event) return false;
    if (event.allDay) return true;
    
    const start = new Date(event.start);
    const end = event.end ? new Date(event.end) : null;
    
    if (!end) return true;
    
    // Check if the event spans multiple days or is a full day event
    return end.getTime() - start.getTime() >= 24 * 60 * 60 * 1000 ||
      (start.getHours() === 0 && 
       start.getMinutes() === 0 && 
       end.getHours() === 0 && 
       end.getMinutes() === 0);
  }

    getCalendarEvents(): Observable<any> {
        return this.http.get('https://script.google.com/macros/s/AKfycbxsUokcZ9GwOgD_Sj_mWwFVFsM9EXMwE-Bn2pez3RBG2-Pc2RVPrTHZkFgJGGwxxzs0/exec');
    }

}
