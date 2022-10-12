import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {DataService} from "../data.service";
import {Subscription} from "rxjs";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  creator!: string;
  name!: string;
  date!: string;
  description!: string;
  place!: string;
  start!: string;
  end!: string;
  error: boolean = false;
  errorMsg!: string;
  sub: Subscription;

  constructor(private modalService: NgbModal, private data: DataService) {
    this.sub = this.data.$user.subscribe((user) => {
      this.creator = user.id;
    });
    this.creator = this.data.getUser().id;
  }

  ngOnInit(): void {
    this.resetInput();
  }

  open(content:any) {
    this.modalService.open(content);
  }

  // Creates a new IEvent object, pushes that object into the logged-in user's
  // "events" array, and updates information in the data service
  addToList(){
    if(this.name === "" || this.date === "" ||
        this.place === "" || this.start === "" ||
        this.end === ""){
      this.error = true;
      this.errorMsg = "All fields required to add to list (except description)";
      return;
    }
    const newEvent =
      {
        id: uuidv4(),
        name: this.name,
        date: this.date,
        place: this.place,
        start: this.start,
        end: this.end,
        description: this.description,
        creator: this.creator
      }
    const userCopy = this.data.getUser();
    userCopy.events.push(newEvent);
    this.data.updateUser(userCopy);
    this.data.setUser(userCopy);
    this.modalService.dismissAll();
    this.resetInput();
  }

  // Reset the input fields if the user cancels adding an event
  resetInput(){
    this.name = "";
    this.date = "";
    this.description = "";
    this.place = "";
    this.start = "";
    this.end = "";
    this.error = false;
  }
}
