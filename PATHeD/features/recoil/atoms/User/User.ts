import {IUser} from '../../interfaces/IUser';

export class User implements IUser {
  id: string;
  name: string;
  surname: string;
  loggedIn: boolean;
  token: string;

  constructor(
    id: string,
    name: string,
    surname: string,
    loggedIn: boolean,
    token: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.loggedIn = loggedIn;
    this.token = token;
  }
}
