export class User {
  public _id?: string;
  public customerId?: string;
  public email: string; //change this to username/add a username
  public password: string;
  public babyorsitterid: string;
}

export interface IUser {
  _id?: string;
  id: string;
  customerId?: string;
  email: string;
  password: string;
  babyorsitterid: string;
}
  