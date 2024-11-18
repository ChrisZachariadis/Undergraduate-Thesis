import axios from 'axios';
import {IAllergyType} from '../interface/IAllergiesAndIntolerances';
import {IDeviceAndImplants} from '../interface/IDeviceAndImplants';
import {IMedicationSummary} from '../interface/IMedicationSummary';
import {IProcedure} from '../interface/IProcedure';
import {ICurrentProblems} from '../interface/ICurrentProblems';
import {IResolvedProblems} from '../interface/IResolvedProblems';
import {IFunctionalStatus} from '../interface/IFunctionalStatus';
import {GATEWAY_API_URL} from '@env';

export const getAllergyIntolerance = async (
  token: string,
  patientId: string,
  translationCode: string | null,
): Promise<IAllergyType[]> => {
  const response = await axios.get<IAllergyType[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetAllergies`,
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

export const getDevices = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<IDeviceAndImplants[]> => {
  const response = await axios.get<IDeviceAndImplants[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetDevices`,
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

export const getMedicationSummary = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<IMedicationSummary[]> => {
  const response = await axios.get<IMedicationSummary[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetMedicationSummary`,
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

export const getCurrentProblems = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<ICurrentProblems[]> => {
  const response = await axios.get<ICurrentProblems[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetCurrentProblems`,
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

export const getResolvedProblems = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<IResolvedProblems[]> => {
  const response = await axios.get<IResolvedProblems[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetResolvedProblems`,
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

export const getProcedures = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<IProcedure[]> => {
  const response = await axios.get<IProcedure[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetProcedures`,
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

export const getFunctionalStatus = async (
  token: string,
  patientId: string,
  translationCode: string,
): Promise<IFunctionalStatus[]> => {
  const response = await axios.get<IFunctionalStatus[]>(
    `${GATEWAY_API_URL}/PatientSummary/GetFunctionalStatus`,
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
