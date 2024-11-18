import {atom} from 'recoil';
import {PatientSummary} from './PatientSummary';
import {persistAtom} from '../../persistAtom';
import {IPatientSummary} from '../../interfaces/IPatientSummary';

export const patientSummaryState = atom<IPatientSummary>({
  key: 'patientSummaryState',
  default: new PatientSummary(
    null,
    null,
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    null,
    [],
    [],
    [],
  ),
  effects_UNSTABLE: [persistAtom('patientSummaryPersistent')],
});
