export interface IMedicationSummary {
  resourceType: string;
  id: string;
  medicationReference: {
    reference: string;
  };
  dispenseRequest: {
    validityPeriod: {
      start: string;
    };
    quantity: {
      value: number;
    };
  };
}

export interface IMedication {
  resourceType: string;
  id: string;
  extension: IExtensionL1[]; // we only need the data on element 1
}
interface IExtensionL1 {
  url: string;
  extension: IExtensionL2[]; // 1st element is product name, 2nd is strength, 3rd description, 4th package Unit and third ROT
}
interface IExtensionL2 {
  url: string;
  valueString: string;
}
