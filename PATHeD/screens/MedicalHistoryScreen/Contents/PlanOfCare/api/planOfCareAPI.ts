import axios from 'axios';
import {GATEWAY_API_URL} from '@env';
import {IPlanOfCare} from '../interface/IPlanOfCare';

export const getPlanOfCare = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<IPlanOfCare[]> => {
  const response = await axios.get<IPlanOfCare[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetPlanOfCare`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
        translationCode: translationCode,
      },
    },
  );
  return response.data;
};
