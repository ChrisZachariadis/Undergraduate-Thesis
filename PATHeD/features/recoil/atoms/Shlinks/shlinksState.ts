import {atom} from 'recoil';
import {persistAtom} from '../../persistAtom';
import {shLinksArray} from './Shlinks';
import {IshLinksArray} from '../../interfaces/IshLinks';

export const shLinksState = atom<IshLinksArray>({
  key: 'shLinksState',
  default: new shLinksArray([]),
  effects_UNSTABLE: [persistAtom('shLinksPersistened')],
});
