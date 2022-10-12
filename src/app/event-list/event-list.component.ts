import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../data.service";
import {IAccount} from "../interfaces/IAccount";
import { IEvent } from '../interfaces/IEvent';
import { IInvite } from '../interfaces/IInvite';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  isEventList: boolean = true;
  from!: string;
  to!: string;
  errorMsg!: string;
  error: boolean = false;
  private user: IAccount;
  private eventList!: IEvent[];
  private inviteList!: IInvite[];
  private eventListCopy!: IEvent[];
  private inviteListCopy!: IInvite[];
  sub: Subscription;

  constructor(private data: DataService) {
    this.user = this.data.getUser();
    this.setLists();
    this.eventListCopy = [...this.eventList];
    this.inviteListCopy = [...this.inviteList];
    this.to = "";
    this.from = "";
    this.sub = this.data.$user.subscribe((user) => {
      this.user = user;
      this.eventList = this.user.events.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
      this.inviteList = this.user.invitations.sort(function(a, b){return Date.parse(a.event.date) - Date.parse(b.event.date)});
      this.eventListCopy = [...this.eventList];
      this.inviteListCopy = [...this.inviteList];
      this.sortEventsByTime(this.eventList);
      this.sortInvitesByTime(this.inviteList);
    });
    this.sortEventsByTime(this.eventList);
    this.sortInvitesByTime(this.inviteList);
  }

  ngOnInit(): void {
  }

  setLists(){
    this.eventList = this.user.events.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
    this.inviteList = this.user.invitations.sort(function(a, b){return Date.parse(a.event.date) - Date.parse(b.event.date)});
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

  filter(){
    this.error = false;
    if(this.from === "" || this.to === ""){
      this.errorMsg = "Please fill in all date inputs!";
      this.error = true;
      return;
    }
    if(this.isEventList === true){
      this.eventList = [];
      for(let event of this.eventListCopy){
        if(Date.parse(event.date) >= Date.parse(this.from) && Date.parse(event.date) <= Date.parse(this.to)){
          this.eventList.push(event);
        }
      }
    }else{
      this.inviteList = [];
      for(let invite of this.inviteListCopy){
        if(Date.parse(invite.event.date) >= Date.parse(this.from) && Date.parse(invite.event.date) <= Date.parse(this.to)){
          this.inviteList.push(invite);
        }
      }
    }
  }

  showAll(){
    this.error = false;
    this.eventList = this.eventListCopy;
    this.inviteList = this.inviteListCopy;
    this.from = "";
    this.to = "";
  }

  switchLists(){
    this.isEventList = !this.isEventList;
    this.error = false;
  }

  sortEventsByTime(events: IEvent[]){
    events.sort(function(a, b){
      const aStart = a.start.split(':');
      const bStart = b.start.split(':');
      return (Date.parse(a.date) + parseInt(aStart[0]) * 3600000 + parseInt(aStart[1]) * 60000) - (Date.parse(b.date) + parseInt(bStart[0]) * 3600000 + parseInt(bStart[1]) * 60000);
    });
  }

  sortInvitesByTime(invites: IInvite[]){
    invites.sort(function(a, b){
      const aStart = a.event.start.split(':');
      const bStart = b.event.start.split(':');
      return (Date.parse(a.event.date) + parseInt(aStart[0]) * 3600000 + parseInt(aStart[1]) * 60000) - (Date.parse(b.event.date) + parseInt(bStart[0]) * 3600000 + parseInt(bStart[1]) * 60000);
    });
  }
}
