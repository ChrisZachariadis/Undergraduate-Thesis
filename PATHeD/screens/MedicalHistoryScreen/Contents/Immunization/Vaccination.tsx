import {useTranslation} from 'react-i18next';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Loading from '../../../../components/Loading/Loading';
import {IVaccination} from './interface/IVaccination';
import {getVaccination} from './api/vaccinationAPI';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import globalStyle from '../../../../assets/styles/globalStyle';
import {useSyncedSummary} from '../../../../common/helpers/useSyncedSummary';

const Vaccination = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<IVaccination[]>(
    getVaccination,
    'vaccinations',
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
            type={'Immunization'}
            title={item.vaccine || t('general.no-data')}
            TopSubtitle={`${t(
              'dates.vaccination',
              // Possible error
            )}: ${
              dayjs(item.vaccinationDate).format(DATE_FORMAT) ||
              t('general.no-data')
            }`}
            BottomSubtitle={`${t('patientSummary.immunization.doses')}: ${
              item.doseNumber || t('general.no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t('dates.vaccination')}
                value={
                  dayjs(item.vaccinationDate).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('patientSummary.immunization.brand')}
                value={item.brand || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.immunization.disease')}
                value={item.disease || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.immunization.holder')}
                value={item.holder || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.immunization.doses')}
                value={item.doseNumber || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.immunization.batch')}
                value={item.batch || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t(
                  'patientSummary.immunization.administering-center',
                )}
                value={item.administeringCenter || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('general.doctor')}
                value={item.physician || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.immunization.country')}
                value={item.country || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('patientSummary.immunization.administered')}
                value={item.administered || t('general.no-data')}
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
export default Vaccination;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
