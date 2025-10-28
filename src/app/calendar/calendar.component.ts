import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';

// Event type with additional properties
interface CustomEvent extends EventInput {
  id: string;
  meta?: {
    description?: string;
    location?: string;
  };
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, RouterModule, FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  styles: [`
    .calendar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
      min-height: calc(100vh - 200px);
    }
    
    .calendar-wrapper {
      margin-top: 20px;
    }
    
    .fc {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .calendar-header {
      text-align: center;
      margin-bottom: 1.5rem;
    }

    h1 {
      color: #333;
      margin: 0 0 1rem 0;
      font-size: 1.8rem;
    }

    .view-options {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
      flex-wrap: wrap;
    }

    .view-button, .today-button, .nav-button {
      padding: 0.5rem 1rem;
      border: 1px solid #ddd;
      background: white;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 0.9rem;
    }

    .view-button:hover, .today-button:hover, .nav-button:hover {
      background: #f5f5f5;
    }

    .view-button.active {
      background: #4a6cf7;
      color: white;
      border-color: #4a6cf7;
    }

    .nav-buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
      margin-top: 1rem;
    }

    .today-button {
      min-width: 80px;
    }

    .calendar-wrapper {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      margin-bottom: 2rem;
    }

    /* Modal Styles */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .modal.active {
      opacity: 1;
      visibility: visible;
    }

    .modal-content {
      background: white;
      border-radius: 8px;
      padding: 1.5rem;
      width: 90%;
      max-width: 500px;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
    }

    .close-button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      padding: 0.5rem;
      line-height: 1;
    }

    .event-description {
      margin: 1rem 0;
      line-height: 1.6;
      color: #555;
    }

    .event-details {
      margin-top: 1rem;
    }

    .event-details p {
      margin: 0.5rem 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .event-details i {
      width: 20px;
      text-align: center;
      color: #4a6cf7;
    }

    /* Responsive styles */
    @media (max-width: 768px) {
      .calendar-container {
        padding: 0.5rem;
      }

      h1 {
        font-size: 1.5rem;
      }

      .view-options {
        gap: 0.3rem;
      }

      .view-button, .today-button, .nav-button {
        padding: 0.4rem 0.8rem;
        font-size: 0.85rem;
      }

      .modal-content {
        width: 95%;
        padding: 1rem;
      }
    }

    /* Calendar overrides */
    :host ::ng-deep {
      .cal-month-view .cal-day-cell:not(:last-child) {
        border-right-color: #eee;
      }

      .cal-month-view .cal-day-cell {
        min-height: 80px;
      }

      .cal-month-view .cal-day-number {
        font-size: 1em;
        margin-top: 5px;
        margin-right: 5px;
      }

      .cal-month-view .cal-event {
        font-size: 0.85em;
        padding: 2px 5px;
        margin: 2px 0;
        border-radius: 3px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .cal-week-view .cal-time-events .cal-event {
        padding: 2px 5px;
        font-size: 0.85em;
      }

      .cal-day-view .cal-hour-segment::after {
        content: '';
        display: block;
        height: 1px;
        background-color: #eee;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
      }

      @media (max-width: 768px) {
        .cal-month-view .cal-day-cell {
          min-height: 60px;
        }

        .cal-month-view .cal-day-number {
          font-size: 0.9em;
        }

        .cal-week-view .cal-time {
          font-size: 0.8em;
          width: 50px;
        }
      }
    }
  `],
})
export class CalendarComponent {
  @ViewChild('calendar') calendarComponent: any;
  
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events: [
      {
        id: '1',
        title: 'Jumu\'ah Prayer',
        start: new Date(),
        end: new Date(new Date().setHours(new Date().getHours() + 1)),
        backgroundColor: '#1e90ff',
        borderColor: '#1e90ff',
        textColor: '#ffffff',
        extendedProps: {
          description: 'Weekly Friday prayer service',
          location: 'Main Prayer Hall'
        }
      }
    ],
    eventClick: this.handleEventClick.bind(this),
    dateClick: this.handleDateClick.bind(this),
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: 'short',
      hour12: true
    },
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: 2,
    height: 'auto'
  };

  selectedEvent: any = null;

  constructor() {}

  // Handle event click
  handleEventClick(clickInfo: EventClickArg) {
    this.selectedEvent = {
      ...clickInfo.event.toPlainObject(),
      extendedProps: clickInfo.event.extendedProps
    };
    clickInfo.jsEvent.preventDefault();
  }

  // Handle date click
  handleDateClick(arg: any) {
    // Handle date click if needed
    console.log('Date clicked:', arg.dateStr);
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
}
