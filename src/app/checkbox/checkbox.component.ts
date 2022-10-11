import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { IAccount } from '../interfaces/IAccount';
import {IEvent} from "../interfaces/IEvent";

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {

  @Input() account!: IAccount;
  @Input() event!: IEvent;
  checked!: boolean;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    if(this.account.invitations.find(invite => invite.event.id === this.event.id) !== undefined){
      this.checked = true;
    }else{
      this.checked = false;
    }
  }

  // When a checkbox is checked/unchecked, add/remove the event to/from the corresponding (with the checkbox) account
  invite(account: IAccount){
    if(account.invitations.find(invite => invite.event.id === this.event.id)){
      account.invitations = account.invitations.filter(invite => invite.event.id !== this.event.id);
      this.data.updateUser(account);
    }else{
      account.invitations.push({event: this.event, accepted: false});
      this.data.updateUser(account);
    }
  }
}
