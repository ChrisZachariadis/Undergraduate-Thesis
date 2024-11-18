import axios from 'axios/index';
import {IGynecological} from '../interface/IGynecological';
import {GATEWAY_API_URL} from '@env';

export const getPregnancyInfo = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<IGynecological> => {
  const response = await axios.get<IGynecological>(
    `${GATEWAY_API_URL}/PatientSummary/GetPregnancy`,
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
