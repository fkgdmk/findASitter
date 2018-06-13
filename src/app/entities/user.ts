export class User {
  public _id?: string;
  public customerId?: string;
  public email: string;
  public password: string;
  public babyorsitterid: string;
}

export interface IUser {
  _id?: string;
  customerId?: string;
  email: string;
  password: string;
  babyorsitterid: string;
}
  