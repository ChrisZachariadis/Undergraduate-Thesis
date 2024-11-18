import {atom} from 'recoil';
import {IBundle, ISummaryResources} from '../../interfaces/ISummaryResources';
import {SummaryResources} from './SummaryResources';

const defaultBundle: IBundle = {
  resourceType: '',
  identifier: {
    system: '',
    value: '',
  },
  type: '',
  timestamp: '',
  entry: [],
};

export const summaryResourcesState = atom<ISummaryResources>({
  key: 'summaryResourcesState',
  default: new SummaryResources(false, defaultBundle),
});
