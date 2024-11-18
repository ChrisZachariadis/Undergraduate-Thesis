export interface IPatientInformation {
  prefix: string;
  familyName: string;
  givenName: string;
  primaryID: string;
  secondaryID: string;
  gender: string;
  birthDate: Date;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  mobilePhoneNumber: string;
  homePhoneNumber: string;
  email: string;
  communicationLanguage: string;
  guardian: {
    familyName: string;
    givenName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
    email: string;
  };
}
