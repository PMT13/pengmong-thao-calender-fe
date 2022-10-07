import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  getAccounts(){
    return this.httpClient.get('http://localhost:3000/accounts') as Observable<IAccount[]>;
  }
  addAccount(account: IAccount){
    this.addCart(account.id);
    return this.httpClient.post('http://localhost:3000/accounts',account) as Observable<IAccount[]>;
  }
}
