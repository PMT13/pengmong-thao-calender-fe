import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IAccount} from "./interfaces/IAccount";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private httpClient: HttpClient) {
  }

  getAccounts(){
    return this.httpClient.get('http://localhost:3000/accounts') as Observable<IAccount[]>;
  }
  addAccount(account: IAccount){
    return this.httpClient.post('http://localhost:3000/accounts',account) as Observable<IAccount[]>;
  }
  updateAccount(id: string, account: IAccount){
    return this.httpClient.put('http://localhost:3000/accounts/' + id,account);
  }
}
