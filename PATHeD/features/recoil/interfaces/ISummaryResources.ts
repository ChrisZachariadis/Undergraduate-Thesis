import {IEntry} from '../../../screens/ShlScreen/interfaces/IPatientSummary';

export interface IBundle {
  resourceType: string;
  identifier: {
    system: string;
    value: string;
  };
  type: string;
  timestamp: string;
  entry: IEntry[];
}

export interface ISummaryResources {
  ready: boolean;
  resources: IBundle;
}
