import { Injectable } from '@angular/core';
import {first, Subject} from "rxjs";
import {IAccount} from "./interfaces/IAccount";
import {HttpService} from "./http.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private accountList!: IAccount[];
  private isLoggedIn!: boolean;
  private user!: IAccount;

  $accountList: Subject<IAccount[]> = new Subject<IAccount[]>();
  $isLoggedIn: Subject<boolean> = new Subject<boolean>();
  $user: Subject<IAccount> = new Subject<IAccount>();

  constructor(private httpService: HttpService) {
    this.getAccounts();
    this.isLoggedIn = false;
  }

  // Retrieve all the accounts from the db.json file and then set accountList to that data and notify subscribers
  getAccounts(){
    this.httpService.getAccounts().pipe(first()).subscribe({
      next: data => {
        this.accountList = data;
        this.$accountList.next(this.accountList);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  getAccountList(){
    return this.accountList;
  }

  getUser(){
    return this.user;
  }

  // Set the current user when someone logs in
  setUser(account:IAccount){
    this.user = account;
    this.$user.next(this.user);
  }

  // Updates the database account list by removing the old account and replacing it with the updated account
  updateUser(account:IAccount){
    const accountIndex = this.accountList.findIndex(account_ => account_.id === account.id);
    if (accountIndex > -1) {
      this.accountList[accountIndex] = account;
      this.$accountList.next(this.accountList);
      this.httpService.updateAccount(account.id,account).pipe(first()).subscribe({
        next: (data) => {
          console.log(this.accountList);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }

  // Set a new user when someone creates an account and add it to the accounts list
  registerUser(account:IAccount){
    this.user = account;
    this.accountList.push(this.user);
    this.$user.next(this.user);
    this.$accountList.next(this.accountList);
  }

  // When someone logs in set the logged in status to true, false when logging out
  setLoginStatus(bool:boolean){
    this.isLoggedIn = bool;
    this.$isLoggedIn.next(this.isLoggedIn);
  }

  getLoginStatus(){
    return this.isLoggedIn;
  }
}
