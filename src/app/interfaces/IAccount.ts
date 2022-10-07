import {IEvent} from "./IEvent";

export interface IAccount{
  id: string,
  username: string,
  password: string,
  events: IEvent[],
  invitations: IEvent[]
}
