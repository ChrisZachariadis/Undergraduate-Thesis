import {IIdentifier} from './IIdentifier';

export interface IResourceReference {
  reference?: string;
  display?: string;
  type?: string;
  identifier?: IIdentifier;
  resource?: any;
}
