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

  id!: string;
  creator!: string;
  name!: string;
  date!: string;
  description!: string;

  sub: Subscription;

  constructor(private modalService: NgbModal, private data: DataService) {
    this.sub = this.data.$user.subscribe((user) => {
      this.creator = user.id;
    });

    this.id = uuidv4();
  }

  ngOnInit(): void {}

  open(content:any) {
    this.modalService.open(content);
  }

  addToList(){
    const newEvent =
      {
        id: this.id,
        name: this.name,
        date: this.date,
        description: this.description,
        creator: this.creator
      }
    const userCopy = this.data.getUser();
    userCopy.events.push(newEvent);
    this.data.updateUser(userCopy);
    this.data.setUser(userCopy);
    this.modalService.dismissAll();
  }

  resetInput(){
    this.name = "";
    this.date = "";
    this.description = "";
  }
}
