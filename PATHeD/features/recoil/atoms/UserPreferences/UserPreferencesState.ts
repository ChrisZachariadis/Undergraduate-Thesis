import {atom} from 'recoil';
import {IUserPreferences} from '../../interfaces/IUserPreferences';
import {UserPreferences} from './UserPreferences';
import {persistAtom} from '../../persistAtom';

export const UserPreferencesState = atom<IUserPreferences>({
  key: 'userPreferencesState',
  default: new UserPreferences(false, 'English'),
  effects_UNSTABLE: [persistAtom('keepLoggedInPersistened')],
});
