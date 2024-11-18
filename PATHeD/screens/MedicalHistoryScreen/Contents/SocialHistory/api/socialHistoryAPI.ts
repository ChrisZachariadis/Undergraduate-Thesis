import axios from 'axios';
import {GATEWAY_API_URL} from '@env';
import {ISocialHistory} from '../interface/ISocialHistory';

export const getSocialHistory = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<ISocialHistory[]> => {
  const response = await axios.get<ISocialHistory[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetSocialHistory`,
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
