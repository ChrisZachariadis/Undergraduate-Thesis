import axios from 'axios';
import {BACKEND_FHIR_URL} from '@env';

export const getSummary = async (token: string, patientId: string) => {
  const response = await axios.get(
    `${BACKEND_FHIR_URL}/Patient/${patientId}/$summary`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
