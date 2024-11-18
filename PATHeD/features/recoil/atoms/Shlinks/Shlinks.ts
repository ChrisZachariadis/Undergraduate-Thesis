import {IshLink, IshLinksArray} from '../../interfaces/IshLinks';

export class shLinksArray implements IshLinksArray {
  links: IshLink[];

  constructor(links: IshLink[]) {
    this.links = links;
  }
}
