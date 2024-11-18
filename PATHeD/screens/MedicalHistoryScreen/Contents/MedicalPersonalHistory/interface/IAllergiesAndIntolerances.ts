export interface IAllergyType {
  type: string;
  substance: string;
  manifestation: string;
  status: string;
  criticality: string;
  severity: string;
  certainty: string;
  onsetDate: Date;
  lastOccurenceDate: Date;
  resolutionDate: Date;
  exposureRoute: string;
  category: string;
  description: string;
}
