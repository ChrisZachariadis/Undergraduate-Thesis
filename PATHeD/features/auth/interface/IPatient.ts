import {IAddress} from '../../../common/interfaces/IAddress';
import {ITelecom} from '../../../common/interfaces/ITelecom';
import {IInsurance} from '../../../common/interfaces/IInsurance';
import {IPractitioner} from './IPractitioner';

export interface IPatient {
  patient: {
    id: string;
    nationalIdentity?: {
      documentNumber?: string;
    };

    insurance?: IInsurance[];

    name?: {
      givenName: string[];
      familyName: string;
    };
    birthDate: Date;
    gender: string;

    address?: IAddress[];
    telecom?: ITelecom[];

    nextOfKinContact?: {
      relationship?: String;
      name?: {
        givenName: string[];
        familyName: string;
      };
      telecom?: ITelecom[];
      address?: IAddress[];
      refOrganization?: string;
    };
  };

  generalPractitioners?: {
    practitioner: IPractitioner;
  };
}
