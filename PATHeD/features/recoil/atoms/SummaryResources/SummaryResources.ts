import {IBundle, ISummaryResources} from '../../interfaces/ISummaryResources';

export class SummaryResources implements ISummaryResources {
  ready: boolean;
  resources: IBundle;

  constructor(ready: boolean, resources: IBundle) {
    this.ready = ready;
    this.resources = resources;
  }
}
