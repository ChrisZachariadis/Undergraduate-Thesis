import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getAllergyIntolerance} from './api/medicalPersonalHistoryAPI';
import Loading from '../../../../components/Loading/Loading';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import {useTranslation} from 'react-i18next';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import globalStyle from '../../../../assets/styles/globalStyle';
import {useSyncedSummary} from '../../../../common/helpers/useSyncedSummary';
import {IAllergyType} from './interface/IAllergiesAndIntolerances';

const AllergiesAndIntolerances = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<IAllergyType[]>(
    getAllergyIntolerance,
    'allergies',
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
        ListEmptyComponent={NoDataSection}
        renderItem={({item}) => (
          <InformationCard
            type={'Allergy'}
            title={item.substance || t('general.no-data')}
            TopSubtitle={item.type || t('general.no-data')}
            BottomSubtitle={item.manifestation || t('general.no-data')}
            risk={item.criticality || 'Undefined'}
            status={item.status || '-'}
            onset={dayjs(new Date(item.onsetDate)).format(DATE_FORMAT) || '-'}>
            <ScrollView>
              <Modalinfo
                placeholder={t('patientSummary.allergies.type')}
                value={item.type || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.allergies.substance')}
                value={item.substance || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.allergies.manifestation')}
                value={item.manifestation || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('dates.onset')}
                value={
                  dayjs(new Date(item.onsetDate)).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('general.status')}
                value={item.status || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('general.criticality')}
                value={item.criticality || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('general.severity')}
                value={item.severity || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('general.certainty')}
                value={item.certainty || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('dates.last-occurrence')}
                value={
                  item.lastOccurenceDate
                    ? dayjs(item.lastOccurenceDate).format(DATE_FORMAT)
                    : t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('dates..resolution')}
                value={
                  item.resolutionDate
                    ? dayjs(item.resolutionDate).format(DATE_FORMAT)
                    : t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('patientSummary.allergies.exposure-route')}
                value={item.exposureRoute || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.allergies.category')}
                value={item.category || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('general.description')}
                value={item.description || t('general.no-data')}
              />
            </ScrollView>
          </InformationCard>
        )}
      />
      {loading && <Loading />}
    </View>
  );
};

export default AllergiesAndIntolerances;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
