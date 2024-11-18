import {atom} from 'recoil';
import {IUser} from '../../interfaces/IUser';
import {User} from './User';

export const userState = atom<IUser>({
  key: 'userState',
  default: new User('', '', '', false, ''),
});
