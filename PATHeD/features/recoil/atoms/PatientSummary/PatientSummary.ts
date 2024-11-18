import {IPatientSummary} from '../../interfaces/IPatientSummary';
import {IAllergyType} from '../../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IAllergiesAndIntolerances';
import {ICurrentProblems} from '../../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/ICurrentProblems';
import {IResolvedProblems} from '../../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IResolvedProblems';
import {IProcedure} from '../../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IProcedure';
import {IFunctionalStatus} from '../../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IFunctionalStatus';
import {IDeviceAndImplants} from '../../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IDeviceAndImplants';
import {IMedicationSummary} from '../../../../screens/MedicalHistoryScreen/Contents/MedicalPersonalHistory/interface/IMedicationSummary';
import {IGynecological} from '../../../../screens/MedicalHistoryScreen/Contents/GynaecologicalHistory/interface/IGynecological';
import {IVaccination} from '../../../../screens/MedicalHistoryScreen/Contents/Immunization/interface/IVaccination';
import {ISocialHistory} from '../../../../screens/MedicalHistoryScreen/Contents/SocialHistory/interface/ISocialHistory';
import {IPlanOfCare} from '../../../../screens/MedicalHistoryScreen/Contents/PlanOfCare/interface/IPlanOfCare';
import {IPatientInformation} from '../../../../screens/ProfileScreen/interface/IPatientInformation';

export class PatientSummary implements IPatientSummary {
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

  constructor(
    lastSynced: Date,
    patientInfo: IPatientInformation,
    allergies: IAllergyType[],
    problems: ICurrentProblems[],
    resolvedProblems: IResolvedProblems[],
    procedures: IProcedure[],
    functionalStatus: IFunctionalStatus[],
    devices: IDeviceAndImplants[],
    medicationSummaries: IMedicationSummary[],
    pregnancies: IGynecological,
    vaccinations: IVaccination[],
    socialHistory: ISocialHistory[],
    planOfCare: IPlanOfCare[],
  ) {
    this.lastSynced = lastSynced;
    this.patientInfo = patientInfo;
    this.allergies = allergies;
    this.problems = problems;
    this.resolvedProblems = resolvedProblems;
    this.procedures = procedures;
    this.functionalStatus = functionalStatus;
    this.devices = devices;
    this.medicationSummaries = medicationSummaries;
    this.pregnancies = pregnancies;
    this.vaccinations = vaccinations;
    this.socialHistory = socialHistory;
    this.planOfCare = planOfCare;
  }
}
