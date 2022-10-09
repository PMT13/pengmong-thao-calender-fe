import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import {IEvent} from "../interfaces/IEvent";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event!: IEvent;
  @Input() isEventList!: boolean;
  id!: string;
  creator!: string;
  name!: string;
  date!: string;
  description!: string;

  constructor(private modalService: NgbModal, private data: DataService) {}

  ngOnInit(): void {
    this.id = this.event.id;
    const accountList = this.data.getAccountList();
    const eventCreator = accountList.find(account => account.id === this.event.creator);
    if(eventCreator !== undefined){
      this.creator = eventCreator.username;
    }
    this.name = this.event.name;
    this.date = this.event.date;
    this.description = this.event.description;
  }

  open(content:any) {
    this.modalService.open(content);
  }

  delete(){
    const userCopy = this.data.getUser();
    userCopy.events = userCopy.events.filter(event => event.id !== this.event.id);
    this.data.updateUser(userCopy);
    this.data.setUser(userCopy);
    for(let i = 0; i < this.data.getAccountList().length; i++){
      this.data.getAccountList()[i].invitations = this.data.getAccountList()[i].invitations.filter(event => event.id !== this.event.id);
      this.data.updateUser(this.data.getAccountList()[i]);
    }
  }

  save(){
    const newEvent =
      {
        id: this.id,
        name: this.name,
        date: this.date,
        description: this.description,
        creator: this.event.creator
      }
    const userCopy = this.data.getUser();
    const eventIndex = userCopy.events.findIndex(event => event.id === this.event.id);
    if (eventIndex > -1) {
      userCopy.events[eventIndex] = newEvent;
      this.data.updateUser(userCopy);
      this.modalService.dismissAll();
      for(let i = 0; i < this.data.getAccountList().length; i++){
        const inviteIndex = this.data.getAccountList()[i].invitations.findIndex(event => event.id === this.event.id);
        if (inviteIndex > -1) {
          this.data.getAccountList()[i].invitations[inviteIndex] = newEvent;
          this.data.updateUser(this.data.getAccountList()[i]);
        }
      }
    }
  }

  resetInput(){
    this.name = this.event.name;
    this.date = this.event.date;
    this.description = this.event.description;
  }
}
