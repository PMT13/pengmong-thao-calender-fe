import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {HttpService} from "../http.service";
import { v4 as uuidv4 } from 'uuid';
import {first, Subscription} from "rxjs";
import {IAccount} from "../interfaces/IAccount";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  username!: string;
  password!: string;
  accountList!: IAccount[];

  sub: Subscription;

  constructor(private data: DataService, private httpService: HttpService ) {
    this.sub = this.data.$accountList.subscribe((accounts) => {
      this.accountList = accounts;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //Checks to see if account is in master account list and acts accordingly
  login(){
    const foundAccount = this.accountList.find((account) => {
      return account.username === this.username &&
        account.password === this.password
    });
    if( foundAccount === undefined){
      alert("Invalid Login");
      return;
    }else{
      this.data.setUser(foundAccount);
      this.data.setLoginStatus(true);
    }
  }

  // Checks if account exists, makes sure input fields aren't empty/are valid, creates a
  // new user and sends post request to http service
  register(){
    const accountExist = this.accountList.find((account) => {return account.username === this.username});
    if( accountExist !== undefined){
      alert("Username already exists.");
      return;
    }
    if(this.username === undefined || this.password === undefined){
      alert("Please fill in all input fields");
      return;
    }
    if(this.username.replace(/\s/g, '') === "" || this.password.replace(/\s/g, '') === ""){
      alert("Please fill in all input fields");
      return;
    }
    const newUser =
      {
        id: uuidv4(),
        username:this.username,
        password:this.password,
        events: [],
        invitations: []
      }
    this.httpService.addAccount(newUser).pipe(first()).subscribe({
      next: () => {
        this.data.setLoginStatus(true);
        this.data.registerUser(newUser);
      },
      error: (err) => {
        alert(err);
      }
    });
  }
}


