import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IAccount } from '../interfaces/IAccount';
import {IEvent} from "../interfaces/IEvent";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @Input() account!: IAccount;
  @Input() event!: IEvent;
  checked!: boolean;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    if(this.account.invitations.find(event => event.id === this.event.id) !== undefined){
      this.checked = true;
    }else{
      this.checked = false; 
    }
  }

  // When a checkbox is checked, add the event to the corresponding (with the checkbox) account
  invite(account: IAccount){
    // const accountCopy = account;
    // accountCopy.invitations.push(this.event);
    // account.invitations.push(this.event);
    // this.data.updateUser(accountCopy);
    this.checked = !this.checked;
  }
}
