import {IShl} from '../../interfaces/IShl';
import {IShlHistory} from '../../interfaces/IShlHistory';

export class ShlHistory implements IShlHistory {
  shLinks: IShl[];

  constructor(array: IShl[]) {
    this.shLinks = array;
  }
}
