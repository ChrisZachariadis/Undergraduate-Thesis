import {useEffect, useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useRecoilState} from 'recoil';
import {userState} from '../../features/recoil/atoms/User/userState';
import {patientSummaryState} from '../../features/recoil/atoms/PatientSummary/PatientSummaryState';
import {PATHED_TRANSCODES} from '../constants/constants';
import {UserPreferencesState} from '../../features/recoil/atoms/UserPreferences/UserPreferencesState';

type fetchSummaryOf<T> = (
  token: string,
  userId: string,
  translationCode: string,
) => Promise<T>;

export function useSyncedSummary<T>(
  fetchSummaryOf: fetchSummaryOf<T>,
  patientSummaryKey: string,
): {data: T | undefined; syncDate: Date | null; loading: boolean} {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(true);
  const [syncDate, setSyncDate] = useState<Date | null>(null);
  const [user, __] = useRecoilState(userState);
  const [patientSummary, _] = useRecoilState(patientSummaryState); // Assuming patientSummaryState is properly typed
  const [userPreferences, ___] = useRecoilState(UserPreferencesState);
  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (state.isConnected) {
        fetchSummaryOf(
          user.token,
          user.id,
          PATHED_TRANSCODES[userPreferences.language],
        )
          .then(newData => {
            setData(newData);
            setSyncDate(new Date());
          })
          .catch(error => console.error(error))
          .finally(() => setLoading(false));
      } else {
        setData(patientSummary[patientSummaryKey] as T);
        setLoading(false);
        setSyncDate(patientSummary.lastSynced as Date);
      }
    });
  }, [fetchSummaryOf, patientSummary, patientSummaryKey, user.id, user.token]);

  return {data, loading, syncDate};
}
