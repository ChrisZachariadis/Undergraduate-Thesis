import axios from 'axios';
import {IBackendResponse} from '../../../common/interfaces/IBackedResponse';
import {IPatient} from '../interface/IPatient';
import {BACKEND_API_URL} from '@env';

export const getPatientProfile = async (
  token: string,
  patientId?: string,
): Promise<IBackendResponse<IPatient>> => {
  const response = await axios.get<IBackendResponse<IPatient>>(
    `${BACKEND_API_URL}/Patient/GetInitialPatientData`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: patientId,
      },
    },
  );

  return response.data;
};
