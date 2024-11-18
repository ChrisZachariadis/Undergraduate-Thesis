import {IUserPreferences} from '../../interfaces/IUserPreferences';

export class UserPreferences implements IUserPreferences {
  keepLoggedIn: boolean;
  language: string;

  constructor(keepLoggedIn: boolean, language: string) {
    this.keepLoggedIn = keepLoggedIn;
    this.language = language;
  }
}
