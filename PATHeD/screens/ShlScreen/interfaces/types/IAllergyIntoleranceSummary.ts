import {ICoding} from '../../../../common/interfaces/ICoding';

export interface IAllergyIntoleranceSummary {
  resourceType: string;
  id: string;
  clinicalStatus: {
    coding: ICoding[];
  };
  type: string;
  category: string;
  criticality: string;
  code: {
    coding: ICoding[]; // if dispaly is "No information about allergies" we ignore the entry
  };
}
