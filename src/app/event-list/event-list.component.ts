import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../data.service";
import {IAccount} from "../interfaces/IAccount";

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  isEventList: boolean = true;
  private user: IAccount;

  sub: Subscription;

  constructor(private data: DataService) {
    this.user = this.data.getUser()
    this.sub = this.data.$user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  getUser(){
    return this.user;
  }
}
