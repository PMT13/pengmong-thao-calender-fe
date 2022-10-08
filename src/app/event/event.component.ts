import {Component, Input, OnInit} from '@angular/core';
import {IEvent} from "../interfaces/IEvent";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event!: IEvent;
  @Input() isEventList!: boolean;
  
  constructor() {
  }

  ngOnInit(): void {}

}
