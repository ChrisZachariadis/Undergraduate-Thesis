import {ICoding} from '../../../../common/interfaces/ICoding';

// Can be for problems or history of past illness,
export interface IConditionSummary {
  resourceType: string;
  id: string;
  clinicalStatus: {
    coding: ICoding[]; // Active(Problems) or Resolved(Past illness)
  };
  code: {
    coding: ICoding[]; // the problem
  };
  severity: {
    coding: ICoding[]; // 1st code display can be "Mild"
  };
  onsetDateTime: string;
  abatementDateTime: string;
}
