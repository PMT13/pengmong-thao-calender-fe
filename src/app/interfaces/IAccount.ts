import {IEvent} from "./IEvent";

export interface IAccount{
  id: string,
  username: string,
  password: string,
  event: IEvent[],
  invitations: IEvent[]
}
