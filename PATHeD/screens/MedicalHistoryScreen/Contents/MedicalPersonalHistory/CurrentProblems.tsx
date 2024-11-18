import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getCurrentProblems} from './api/medicalPersonalHistoryAPI';
import {ICurrentProblems} from './interface/ICurrentProblems';
import {useTranslation} from 'react-i18next';
import Loading from '../../../../components/Loading/Loading';
import Modalinfo from '../../../../components/Modalinfo/Modalinfo';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import globalStyle from '../../../../assets/styles/globalStyle';
import {useSyncedSummary} from '../../../../common/helpers/useSyncedSummary';

const CurrentProblems = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<ICurrentProblems[]>(
    getCurrentProblems,
    'problems',
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
            title={item.diagnosis || t('general.no-data')}
            TopSubtitle={`${t('dates.onset')}: ${
              dayjs(item.onsetDate).format(DATE_FORMAT) || t('general.no-data')
            }`}
            BottomSubtitle={`${t('general.severity')}: ${
              item.severity || t('general.no-data')
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
                placeholder={t('general.severity')}
                value={item.severity || t('general.no-data')}
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

export default CurrentProblems;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
