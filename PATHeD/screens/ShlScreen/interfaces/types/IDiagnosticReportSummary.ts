import {ICoding} from '../../../../common/interfaces/ICoding';

export interface IDiagnosticReportSummary {
  resourceType: string;
  id: string;
  category: ICategory[];
  code: {
    coding: ICoding[];
  };
  effectiveDateTime: string;
}

interface ICategory {
  coding: ICoding[];
}
