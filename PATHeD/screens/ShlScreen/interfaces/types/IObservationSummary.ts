// Can be Diagnostic Result, Vital Signs, Pregnancy Info, Social History
import {ICoding} from '../../../../common/interfaces/ICoding';

export interface IObservationSummary {
  resourceType: string;
  id: string;
  category: ICategory[]; // cde can be "vital-signs", "social-history", Exam
  code: {
    coding: ICoding[];
  };
  effectiveDateTime: string;
  valueQuantity: {
    value: number;
    unit: string;
  };
  valueDateTime: string;
  valueCodeableConcept: {
    coding: ICoding[];
  };
  effectivePeriod: {
    start: string;
    end: string;
  };
  component: IExtension[];
  valueString: string;
}

interface ICategory {
  coding: ICoding[];
}

interface IExtension {
  extension: IValue[];
  valueQuantity: {
    value: number;
  };
  valueCodeableConcept: {
    coding: ICoding[];
  };
  valueInteger: number;
}

interface IValue {
  valueCodeableConcept: {
    coding: ICoding[];
  };
}
