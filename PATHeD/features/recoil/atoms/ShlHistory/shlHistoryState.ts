import {atom} from 'recoil';
import {IShlHistory} from '../../interfaces/IShlHistory';
import {ShlHistory} from './ShlHistory';
import {persistAtom} from '../../persistAtom';

export const shlHistoryState = atom<IShlHistory>({
  key: 'shlHistoryState',
  default: new ShlHistory([]),
  effects_UNSTABLE: [persistAtom('shlHistoryPersisted')],
});
