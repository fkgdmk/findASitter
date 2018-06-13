export class Sitter {
  public id: number;
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

