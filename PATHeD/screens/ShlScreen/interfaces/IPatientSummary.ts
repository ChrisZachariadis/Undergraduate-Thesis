import {IAllergyIntoleranceSummary} from './types/IAllergyIntoleranceSummary';
import {IMedication, IMedicationSummary} from './types/IMedicationSummary';
import {ICarePlanSummary} from './types/ICarePlanSummary';
import {IConditionSummary} from './types/IConditionSummary';
import {IDeviceSummary} from './types/IDeviceSummary';
import {IDiagnosticReportSummary} from './types/IDiagnosticReportSummary';
import {IProcedureSummary} from './types/IProcedureSummary';
import {IEpisodeOfCareSummary} from './types/IEpisodeOfCareSummary';
import {IImmunizationSummary} from './types/IImmunizationSummary';
import {IObservationSummary} from './types/IObservationSummary';

export interface IPatientSummary {
  entry: IEntry[];
}

export interface IEntry {
  fullUrl: string;
  resource:
    | IMedicationSummary
    | IMedication
    | IAllergyIntoleranceSummary
    | ICarePlanSummary
    | IProcedureSummary
    | IConditionSummary
    | IDeviceSummary
    | IDiagnosticReportSummary
    | IEpisodeOfCareSummary
    | IImmunizationSummary
    | IObservationSummary
    | IOthers;
}

// Composition, Consent, Encounter, Location, MedicationStatement, Organization, Patient, Practitioner, PractitionerRole
interface IOthers {
  resourceType: string;
  id: string;
}
