import React from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import InformationCard from '../../../../components/InformationCard/InformationCard';
import {getDevices} from './api/medicalPersonalHistoryAPI';
import {IDeviceAndImplants} from './interface/IDeviceAndImplants';
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

const DeviceAndImplants = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<IDeviceAndImplants[]>(
    getDevices,
    'devices',
  );

  return (
    <View style={styles.containerHeight}>
      <Text style={globalStyle.descriptionItalic}>
        {t('dates.lastSynchronized')}:{' '}
        {dayjs(syncDate).format(SYNCED_TIME_FORMAT)}
      </Text>
      <FlatList
        keyExtractor={(__, index) => index.toString()}
        data={data}
        renderItem={({item}) => {
          return (
            <InformationCard
              type={'Procedure'}
              title={item.name || t('general.no-data')}
              TopSubtitle={`${t('dates.onset')}: ${
                dayjs(item.implantDate).format(DATE_FORMAT) ||
                t('general.no-data')
              }`}
              BottomSubtitle={`${t('dates.removal')}: ${
                item.removalDate
                  ? t('general.no-data')
                  : dayjs(item.removalDate).format(DATE_FORMAT)
              }`}>
              <ScrollView>
                <Modalinfo
                  placeholder={t('dates.onset')}
                  value={
                    dayjs(item.implantDate).format(DATE_FORMAT) ||
                    t('general.no-data')
                  }
                />
                <Modalinfo
                  placeholder={t('dates.removal')}
                  value={
                    item.removalDate
                      ? t('general.no-data')
                      : dayjs(item.removalDate).format(DATE_FORMAT)
                  }
                />
              </ScrollView>
            </InformationCard>
          );
        }}
        ListEmptyComponent={NoDataSection}
      />
      {loading && <Loading />}
    </View>
  );
};

export default DeviceAndImplants;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
