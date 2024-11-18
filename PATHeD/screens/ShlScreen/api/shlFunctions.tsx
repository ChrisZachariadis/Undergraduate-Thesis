import axios from 'axios';
import {BACKEND_API_URL} from '@env';
import {IBackendResponse} from '../../../common/interfaces/IBackedResponse';
import {IShl} from '../../../features/recoil/interfaces/IShl';

export const deleteLink = async (
  link: string,
  token: string,
): Promise<IBackendResponse<boolean>> => {
  const response = await axios.patch(
    `${BACKEND_API_URL}/SmartHealthLink/DeleteSmartHealthLink`,
    {},
    {
      params: {
        link: link,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const getLinks = async (
  token: string,
  id: string,
): Promise<IBackendResponse<IShl[]>> => {
  const response = await axios.get(
    `${BACKEND_API_URL}/SmartHealthLink/GetSmartHealthLinkHistory`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        patientId: id,
      },
    },
  );
  return response.data;
};

export const generateSHLink = async (
  token: string,
  id: string,
  code: string,
  name: string,
  expiration: string,
  resources: string,
): Promise<IBackendResponse<string>> => {
  const response = await axios.post(
    `${BACKEND_API_URL}/SmartHealthLink/GenerateSmartHealthLink`,
    {
      patientId: id,
      label: name,
      passcode: code,
      expirationDate: expiration,
      data: resources,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};
