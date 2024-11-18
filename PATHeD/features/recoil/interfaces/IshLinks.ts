export interface IshLinksArray {
  links: IshLink[];
}

export interface IshLink {
  id: string;
  label: string;
  shlink: string;
  passcode: string;
  dateGenerated: string;
  expirationDate: string;
}
