import axios from 'axios';
import {GATEWAY_API_URL} from '@env';
import {IPatientInformation} from '../interface/IPatientInformation';

export const getPatientInformation = async (
  token: string,
  patientId: string,
  translationCode: string | null,
): Promise<IPatientInformation> => {
  const response = await axios.get<IPatientInformation>(
    `${GATEWAY_API_URL}/PatientSummary/GetPatient`,
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
