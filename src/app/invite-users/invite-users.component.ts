import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../data.service";
import {IAccount} from "../interfaces/IAccount";
import {IEvent} from "../interfaces/IEvent";

@Component({
  selector: 'app-invite-users',
  templateUrl: './invite-users.component.html',
  styleUrls: ['./invite-users.component.css']
})
export class InviteUsersComponent implements OnInit,OnDestroy {

  @Input() event!: IEvent;
  accountList!: IAccount[];
  sub: Subscription;

  constructor(private data: DataService) {
    this.sub = this.data.$accountList.subscribe((accounts) => {
      this.accountList = accounts;
      const thisUser = this.data.getUser().id;
      this.accountList = this.accountList.filter(account => account.id !== thisUser);
    });
  }
  ngOnInit(): void {
    this.accountList = this.data.getAccountList();
    const thisUser = this.data.getUser().id;
    this.accountList = this.accountList.filter(account => account.id !== thisUser);
  }
  ngOnDestroy(): void{
    this.sub.unsubscribe();
  }
}
