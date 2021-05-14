export default class Session {
  token: string;
  expiresIn: number;
  id: string;

  constructor(_token: string, _expiresIn: number, _id: string){
    this.token = _token;
    this.expiresIn = _expiresIn;
    this.id = _id;
  }
}