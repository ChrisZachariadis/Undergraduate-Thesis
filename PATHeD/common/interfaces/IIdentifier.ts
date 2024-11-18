import {ICodeableConcept} from './ICodeableConcept';
import {IResourceReference} from './IResourceReference';

export interface IIdentifier {
  use: string;
  type: ICodeableConcept;
  startDate: Date;
  endDate: Date;
  system: string;
  value: string;
  assigner: IResourceReference;
}
