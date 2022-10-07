import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../data.service";
import {HttpService} from "../http.service";
import { v4 as uuidv4 } from 'uuid';
import {first} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username!: string;
  password!: string;

  constructor(private data: DataService, private httpService: HttpService ) {}

  ngOnInit(): void {
  }

  login(){
    const foundAccount = this.data.accountList.find((account) => {
      return account.username === this.username &&
        account.password === this.password
    });
    if( foundAccount === undefined){
      alert("Invalid Login");
      return;
    }else{
      this.status.setUser(foundAccount);
      this.status.setLoginStatus(true);
      this.data.getCart();
    }
  }
  register(){
    const accountExist = this.data.accountList.find((account) => {return account.username === this.username});
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
        password:this.password
      }
    this.httpService.addAccount(newUser).pipe(first()).subscribe({
      next: () => {
        this.status.setLoginStatus(true);
        this.status.setUser(newUser);
        this.data.getCart();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}


