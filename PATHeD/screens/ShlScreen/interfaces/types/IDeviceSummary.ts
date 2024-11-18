import {ICoding} from '../../../../common/interfaces/ICoding';

export interface IDeviceSummary {
  resourceType: string;
  id: string;
  type: {
    coding: ICoding[];
  };
  status: string;
}
