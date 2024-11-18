import {ICoding} from '../../../../common/interfaces/ICoding';

export interface IConsentSummary {
  resourceType: string;
  id: string;
  status: string;
  scope: {
    coding: ICoding[];
  };
  performer: IReference[];
  dateTime: string;
}

interface IReference {
  reference: string;
}
export interface IPractitionerRole {
  resourceType: string;
  id: string;
  code: {
    coding: ICoding[];
  }[];
}
