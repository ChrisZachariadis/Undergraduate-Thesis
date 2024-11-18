import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import Loading from '../../../../components/Loading/Loading';
import {getMedicationSummary} from './api/medicalPersonalHistoryAPI';
import {IMedicationSummary} from './interface/IMedicationSummary';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import globalStyle from '../../../../assets/styles/globalStyle';
import {useSyncedSummary} from '../../../../common/helpers/useSyncedSummary';

const MedicationSummary = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<IMedicationSummary[]>(
    getMedicationSummary,
    'medicationSummaries',
  );

  return (
    <View style={styles.containerHeight}>
      <Text style={globalStyle.descriptionItalic}>
        {t('dates.lastSynchronized')}:{' '}
        {dayjs(syncDate).format(SYNCED_TIME_FORMAT)}
      </Text>
      <FlatList
        keyExtractor={(_, index) => index.toString()}
        data={data}
        renderItem={({item}) => (
          <InformationCard
            type={'Medication'}
            title={item.ingredient || t('general.no-data')}
            risk={item.status || t('general.no-data')}
            onset={
              item.startDate
                ? dayjs(item.startDate).format(DATE_FORMAT)
                : t('general.no-data')
            }
            TopSubtitle={`${item.doseForm || t('general.no-data')}`}
            BottomSubtitle={`${
              item.startDate
                ? dayjs(item.endDate).format(DATE_FORMAT)
                : t('general.no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t('patientSummary.medication-summary.strength')}
                value={item.strength || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('dates.onset')}
                value={
                  dayjs(item.startDate).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('dates.end')}
                value={
                  dayjs(item.endDate).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('patientSummary.medication-summary.frequency')}
                value={item.frequency || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.medication-summary.dosage')}
                value={item.dosage || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.medication-summary.form')}
                value={`${item.doseForm || t('general.no-data')}`}
              />
              <Modalinfo
                placeholder={t('general.status')}
                value={item.status || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'patientSummary.medication-summary.administration',
                )}
                value={item.routeOfAdministration || t('general.no-data')}
              />
            </ScrollView>
          </InformationCard>
        )}
        ListEmptyComponent={NoDataSection}
      />
      {loading && <Loading />}
    </View>
  );
};

export default MedicationSummary;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
