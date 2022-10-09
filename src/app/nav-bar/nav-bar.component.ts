import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {first} from "rxjs";
import {IAccount} from "../interfaces/IAccount";
import {DataService} from "../data.service";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Output() onLog = new EventEmitter<boolean>();
  isLoggedIn: boolean = this.data.getLoginStatus();
  user: IAccount = this.data.getUser();

  constructor(private data: DataService) {
    this.data.$isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.data.$user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  logout(){
    this.data.setLoginStatus(false);
  }
}
