import {IVaccination} from '../interface/IVaccination';
import axios from 'axios';
import {GATEWAY_API_URL} from '@env';

export const getVaccination = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<IVaccination[]> => {
  const response = await axios.get<IVaccination[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetVaccination`,
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
