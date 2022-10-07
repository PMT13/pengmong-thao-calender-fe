import { Component } from '@angular/core';
import {DataService} from "./data.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'event-tracker';

  private isLoggedIn: boolean = false;
  sub: Subscription;

  constructor(private data: DataService) {
    this.sub = this.data.$isLoggedIn.subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  getLoginStatus(){
    return this.isLoggedIn;
  }
}
