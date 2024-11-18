import {ICoding} from '../../../../common/interfaces/ICoding';

export interface IImmunizationSummary {
  resourceType: string;
  id: string;
  vaccineCode: {
    coding: ICoding[];
  };
  occurrenceDateTime: string;
  lotNumber: number;
}
