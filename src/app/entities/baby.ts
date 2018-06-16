export class Baby {
  public _id?: string;
  public customerId?: string;
  public id: number;
  public firstname: string;
  public postalCode: string;
  public picture: string;
  public age: number; // months
  public gender: string;
  public userId?: string;
}

export interface IBaby {
  _id?: string;
  customerId?: string;
  id: number;
  firstname: string;
  postalCode: string;
  picture: string;
  age: number; // months
  gender: string;
  userId?: string;
}