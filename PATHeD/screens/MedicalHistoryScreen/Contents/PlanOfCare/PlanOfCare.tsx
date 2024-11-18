import {useTranslation} from 'react-i18next';
import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import Loading from '../../../../components/Loading/Loading';
import {IPlanOfCare} from './interface/IPlanOfCare';
import {getPlanOfCare} from './api/planOfCareAPI';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import globalStyle from '../../../../assets/styles/globalStyle';
import dayjs from 'dayjs';
import {SYNCED_TIME_FORMAT} from '../../../../common/constants/constants';
import {useSyncedSummary} from '../../../../common/helpers/useSyncedSummary';

const PlanOfCare = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<IPlanOfCare[]>(
    getPlanOfCare,
    'planOfCare',
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
            type={'PlanOfCare'}
            title={`${t('patientSummary.plan-of-care.recommendation')}: ${
              item.case || t('general.no-data')
            }`}
            TopSubtitle={item.description || t('general.no-data')}
            BottomSubtitle={''}>
            <ScrollView style={styles.containerHeight}>
              <Modalinfo
                placeholder={t('patientSummary.plan-of-care.recommendation')}
                value={item.description || t('general.no-data')}
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
export default PlanOfCare;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
