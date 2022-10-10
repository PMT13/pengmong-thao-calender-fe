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
  from!: string;
  to!: string;
  private user: IAccount;
  private eventList!: IEvent[];
  private inviteList!: IEvent[];
  private eventListCopy!: IEvent[];
  private inviteListCopy!: IEvent[];
  sub: Subscription;

  constructor(private data: DataService) {
    this.user = this.data.getUser();
    this.setLists();
    this.eventListCopy = [...this.eventList];
    this.inviteListCopy = [...this.inviteList];
    this.sub = this.data.$user.subscribe((user) => {
      this.user = user;
      this.eventList = this.user.events.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
      this.inviteList = this.user.invitations.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
      this.eventListCopy = [...this.eventList];
      this.inviteListCopy = [...this.inviteList];
    });
  }

  ngOnInit(): void {
  }

  setLists(){
    this.eventList = this.user.events.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
    this.inviteList = this.user.invitations.sort(function(a, b){return Date.parse(a.date) - Date.parse(b.date)});
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
    if(this.isEventList === true){
      this.eventList = [];
      for(let event of this.eventListCopy){
        if(Date.parse(event.date) >= Date.parse(this.from) && Date.parse(event.date) <= Date.parse(this.to)){
          this.eventList.push(event);
        }
      }
    }else{
      this.inviteList = [];
      for(let event of this.inviteListCopy){
        if(Date.parse(event.date) >= Date.parse(this.from) && Date.parse(event.date) <= Date.parse(this.to)){
          this.inviteList.push(event);
        }
      }
    }
    console.log(this.eventList);
  }
}
