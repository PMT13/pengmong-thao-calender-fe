import {Component, OnDestroy, OnInit, Output} from '@angular/core';
import {first, Subscription} from "rxjs";
import {IAccount} from "../interfaces/IAccount";
import {DataService} from "../data.service";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit,OnDestroy {

  isLoggedIn: boolean = this.data.getLoginStatus();
  user: IAccount = this.data.getUser();

  sub:Subscription;
  subTwo: Subscription;

  constructor(private data: DataService) {
    this.sub = this.data.$isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.subTwo = this.data.$user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
    this.subTwo.unsubscribe();
  }

  logout(){
    this.data.setLoginStatus(false);
  }
}
