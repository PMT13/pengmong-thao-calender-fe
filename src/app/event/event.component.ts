import {Component, Input, OnInit} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import {IEvent} from "../interfaces/IEvent";
import { IInvite } from '../interfaces/IInvite';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event!: IEvent;
  @Input() invite!: IInvite;
  @Input() isEventList!: boolean;
  id!: string;
  creator!: string;
  name!: string;
  date!: string;
  description!: string;
  place!: string;
  start!: string;
  end!: string;
  error: boolean = false;
  errorMsg!: string;

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
    this.place = this.event.place;
    this.start = this.event.start;
    this.end = this.event.end;
  }

  open(content:any) {
    this.modalService.open(content);
  }

  // Delete the slected event from the user's events and other user's invitations list if they were invited to it.
  // Update the data service and set the user with the updated user information
  delete(){
    const userCopy = this.data.getUser();
    userCopy.events = userCopy.events.filter(event => event.id !== this.event.id);
    this.data.updateUser(userCopy);
    this.data.setUser(userCopy);
    for(let i = 0; i < this.data.getAccountList().length; i++){
      this.data.getAccountList()[i].invitations = this.data.getAccountList()[i].invitations.filter(invite => invite.event.id !== this.event.id);
      this.data.updateUser(this.data.getAccountList()[i]);
    }
  }

  // Update any traces of the event(in user's event[] or in other user's invitations[]
  // Update user in data service and set current user to updated user
  // Make sure user can't edit blank information when editting
  save(){
    if(this.name === "" || this.date === "" ||
      this.place === "" || this.start === "" ||
      this.end === ""){
      this.error = true;
      this.errorMsg = "All fields required to add to list (except description)";
      return;
    }
    const newEvent =
      {
        id: this.id,
        name: this.name,
        date: this.date,
        place: this.place,
        start: this.start,
        end: this.end,
        description: this.description,
        creator: this.event.creator
      }
    const userCopy = this.data.getUser();
    const eventIndex = userCopy.events.findIndex(event => event.id === this.event.id);
    if (eventIndex > -1) {
      userCopy.events[eventIndex] = newEvent;
      this.data.updateUser(userCopy);
      this.data.setUser(userCopy);
      this.modalService.dismissAll();
      for(let i = 0; i < this.data.getAccountList().length; i++){
        const inviteIndex = this.data.getAccountList()[i].invitations.findIndex(invite => invite.event.id === this.event.id);
        if (inviteIndex > -1) {
          this.data.getAccountList()[i].invitations[inviteIndex] = {event: newEvent, accepted: this.data.getAccountList()[i].invitations[inviteIndex].accepted};
          this.data.updateUser(this.data.getAccountList()[i]);
        }
      }
      this.error = false;
    }
  }

  // If user declines an invitation, delete it from their invitations list
  // Update the data service information and update the current user information
  decline(){
    const updatedInvites = this.data.getUser().invitations.filter(invite => invite.event.id !== this.event.id);
    this.data.getUser().invitations = updatedInvites;
    this.data.updateUser(this.data.getUser());
    this.data.setUser(this.data.getUser());
  }

  // If user accepts invitation, display a message to indicate this and update data
  accept(){
    const inviteIndex = this.data.getUser().invitations.findIndex(invite => invite.event.id === this.event.id);
    this.data.getUser().invitations[inviteIndex].accepted = true;
    this.data.updateUser(this.data.getUser());
    this.data.setUser(this.data.getUser());
  }

  // If a user cancels their editting, return event values back to the their
  // original values before the editting started
  resetInput(){
    this.name = this.event.name;
    this.date = this.event.date;
    this.description = this.event.description;
    this.place = this.event.place;
    this.start = this.event.start;
    this.end = this.event.end;
    this.error = false;
  }
}
