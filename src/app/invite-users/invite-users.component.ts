import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {DataService} from "../data.service";
import {IAccount} from "../interfaces/IAccount";
import {IEvent} from "../interfaces/IEvent";

@Component({
  selector: 'app-invite-users',
  templateUrl: './invite-users.component.html',
  styleUrls: ['./invite-users.component.css']
})
export class InviteUsersComponent implements OnInit {

  @Input() event!: IEvent;
  accountList!: IAccount[];
  sub: Subscription;

  constructor(private data: DataService) {
    this.sub = this.data.$accountList.subscribe((accounts) => {
      this.accountList = accounts;
    });
  }
  ngOnInit(): void {
    this.accountList = this.data.getAccountList();
  }

  // When a checkbox is checked, add the event to the corresponding (with the checkbox) account
  invite(account: IAccount){
    // have to check to see if it's checked or not (if event is already in invitations array)
    const accountCopy = account;
    accountCopy.invitations.push(this.event);
    this.data.updateUser(accountCopy);
    console.log(account);
  }
}
