import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getProcedures} from './api/medicalPersonalHistoryAPI';
import {IProcedure} from './interface/IProcedure';
import {useTranslation} from 'react-i18next';
import Loading from '../../../../components/Loading/Loading';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import globalStyle from '../../../../assets/styles/globalStyle';
import {useSyncedSummary} from '../../../../common/helpers/useSyncedSummary';

const Procedures = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<IProcedure[]>(
    getProcedures,
    'procedures',
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
            type={'Procedure'}
            title={item.description || t('general.no-data')}
            TopSubtitle={`${t('patientSummary.problems.body-site')}: ${
              item.bodysite || t('general.no-data')
            }`}
            BottomSubtitle={`${t('dates.procedure')}: ${
              dayjs(item.procedureDate).format(DATE_FORMAT) ||
              t('general.no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t('patientSummary.problems.body-site')}
                value={item.bodysite || t('general.no-data')}
              />
              <Modalinfo
                placeholder={t('dates.procedure')}
                value={
                  dayjs(item.procedureDate).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
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

export default Procedures;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
