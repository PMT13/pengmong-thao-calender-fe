import {IAccount} from "./IAccount";

export interface IEvent{
  id: string,
  name: string,
  date: string,
  description: string,
  creator: IAccount
}
