import {IEvent} from "./IEvent";
import { IInvite } from "./IInvite";

export interface IAccount{
  id: string,
  username: string,
  password: string,
  events: IEvent[],
  invitations: IInvite[]
}
