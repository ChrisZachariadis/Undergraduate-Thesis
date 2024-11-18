import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getFunctionalStatus} from './api/medicalPersonalHistoryAPI';
import {IFunctionalStatus} from './interface/IFunctionalStatus';
import Loading from '../../../../components/Loading/Loading';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import {useTranslation} from 'react-i18next';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import globalStyle from '../../../../assets/styles/globalStyle';
import {useSyncedSummary} from '../../../../common/helpers/useSyncedSummary';

const FunctionalStatus = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<IFunctionalStatus[]>(
    getFunctionalStatus,
    'functionalStatus',
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
            title={item.result || '-'}
            TopSubtitle={`${t('dates.onset')}: ${
              dayjs(item.onsetDate).format(DATE_FORMAT) || t('general.no-data')
            }`}
            BottomSubtitle={`${t('dates.assessment')}: ${
              dayjs(item.assesmentDate).format(DATE_FORMAT) ||
              t('general.no-data')
            }`}>
            <ScrollView>
              <Modalinfo
                placeholder={t('dates.onset')}
                value={
                  dayjs(item.onsetDate).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('dates.assessment')}
                value={
                  dayjs(item.assesment).format(DATE_FORMAT) ||
                  t('general.no-data')
                }
              />
              <Modalinfo
                placeholder={t('general.description')}
                value={item.result || t('general.no-data')}
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

export default FunctionalStatus;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
