export class Sitter {
  public _id: string;
  public id: number;
  public customerId?: string;
  public firstname: String;
  public lastname: String;
  public age: number;
  public yearsOfExperience: number;
  public region: String;
  public picture: String;
  public gender: String;
  public phone: String;
}

export interface ISitter {
  id: number;
  firstname: String;
  lastname: String;
  age: number;
  yearsOfExperience: number;
  region: String;
  picture: String;
  gender: String;
  phone: String;
}

