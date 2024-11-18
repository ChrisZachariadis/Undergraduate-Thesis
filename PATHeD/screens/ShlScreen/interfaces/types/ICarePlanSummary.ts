import {ICoding} from '../../../../common/interfaces/ICoding';

export interface ICarePlanSummary {
  resourceType: string;
  id: string;
  status: string;
  intent: string;
  category: ICoding[];
  title: string;
  description: string;
}
