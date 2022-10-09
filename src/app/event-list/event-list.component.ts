import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../data.service";
import {IAccount} from "../interfaces/IAccount";
import { IEvent } from '../interfaces/IEvent';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  isEventList: boolean = true;
  private user: IAccount;
  private eventList!: IEvent[];
  private inviteList!: IEvent[];
  sub: Subscription;

  constructor(private data: DataService) {
    this.user = this.data.getUser();
    this.eventList = this.user.events.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
    this.inviteList = this.user.invitations.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
    this.sub = this.data.$user.subscribe((user) => {
      this.user = user;
      this.eventList = this.user.events.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
      this.inviteList = this.user.invitations.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
    });
  }

  ngOnInit(): void {
  }

  getUser(){
    return this.user;
  }

  getEventList(){
    return this.eventList;
  }

  getInvitationsList(){
    return this.inviteList;
  }
}
