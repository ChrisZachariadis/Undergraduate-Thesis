import {ICoding} from '../../../../common/interfaces/ICoding';

export interface IProcedureSummary {
  resourceType: string;
  id: string;
  code: {
    coding: ICoding[];
  };
  performedDateTime: string;
  bodySite: IBodySite[];
}

interface IBodySite {
  coding: ICoding[];
}
