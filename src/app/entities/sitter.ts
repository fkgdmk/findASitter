export class Sitter {
  public _id: string;
  public id: number;
  public customerId?: string;
  public firstname: string;
  public lastname: string;
  public age: number;
  public yearsOfExperience: number;
  public region: string;
  public picture: string;
  public gender: string;
  public phone: string;
}

export interface ISitter {
  _id: string;
  firstname: string;
  lastname: string;
  age: number;
  yearsOfExperience: number;
  region: string;
  picture: string;
  gender: string;
  phone: string;
}

