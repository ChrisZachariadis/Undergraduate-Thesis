import axios from 'axios/index';
import {GATEWAY_API_URL} from '@env';
import {IPatientSummary} from '../../../features/recoil/interfaces/IPatientSummary';

export const getPatientSummary = async (
  token: string,
  patientId: string,
  translationCode: string | null,
): Promise<IPatientSummary> => {
  const response = await axios.get<IPatientSummary>(
    `${GATEWAY_API_URL}/PatientSummary/GetSummary`,
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
  response.data.lastSynced = new Date();

  return response.data;
};
