import {ICurrentProblems} from '../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/ICurrentProblems';
import {IResolvedProblems} from '../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IResolvedProblems';
import {IProcedure} from '../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IProcedure';
import {IAllergyType} from '../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IAllergiesAndIntolerances';
import {IFunctionalStatus} from '../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IFunctionalStatus';
import {IDeviceAndImplants} from '../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IDeviceAndImplants';
import {IMedicationSummary} from '../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IMedicationSummary';
import {IGynecological} from '../../../screens/MedicalHistoryScreen/Contents/GynaecologicalHistory/interface/IGynecological';
import {IVaccination} from '../../../screens/MedicalHistoryScreen/Contents/Immunization/interface/IVaccination';
import {ISocialHistory} from '../../../screens/MedicalHistoryScreen/Contents/SocialHistory/interface/ISocialHistory';
import {IPlanOfCare} from '../../../screens/MedicalHistoryScreen/Contents/PlanOfCare/interface/IPlanOfCare';
import {IPatientInformation} from '../../../screens/ProfileScreen/interface/IPatientInformation';

export interface IPatientSummary {
  lastSynced: Date;
  patientInfo: IPatientInformation;
  allergies: IAllergyType[];
  problems: ICurrentProblems[];
  resolvedProblems: IResolvedProblems[];
  procedures: IProcedure[];
  functionalStatus: IFunctionalStatus[];
  devices: IDeviceAndImplants[];
  medicationSummaries: IMedicationSummary[];
  pregnancies: IGynecological;
  vaccinations: IVaccination[];
  socialHistory: ISocialHistory[];
  planOfCare: IPlanOfCare[];
}
