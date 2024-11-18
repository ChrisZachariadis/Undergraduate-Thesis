import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ISocialHistory} from '../interface/ISocialHistory';
import {getSocialHistory} from '../api/socialHistoryAPI';
import InformationCard from '../../../../../components/InformationCard/InformationCard';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../../common/constants/constants';
import Modalinfo from '../../../../../components/Modalinfo/Modalinfo';
import NoDataSection from '../../../../../components/NoDataSection/NoDataSection';
import Loading from '../../../../../components/Loading/Loading';
import globalStyle from '../../../../../assets/styles/globalStyle';
import {useSyncedSummary} from '../../../../../common/helpers/useSyncedSummary';

const SocialHistoryScreen = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<ISocialHistory[]>(
    getSocialHistory,
    'socialHistory',
  );

  return (
    <SafeAreaView>
      <View style={styles.containerHeight}>
        <View style={globalStyle.marginTop60}>
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
                title={item.type || t('general.no-data')}
                TopSubtitle={`${t('dictionary.from')} ${
                  item.startDate
                    ? `${dayjs(item.startDate).format(DATE_FORMAT)} ${t(
                        'dictionary.until',
                      )} ${
                        item.endDate
                          ? dayjs(item.endDate).format(DATE_FORMAT)
                          : t('dictionary.present')
                      }`
                    : t('general.no-data')
                }`}
                BottomSubtitle={`${item.value} ${item.unit}`}>
                <ScrollView>
                  <Modalinfo
                    placeholder={t('dates.onset')}
                    value={
                      item.startDate
                        ? dayjs(item.startDate).format(DATE_FORMAT)
                        : t('general.no-data')
                    }
                  />
                  <Modalinfo
                    placeholder={t('dates.end')}
                    value={
                      item.startDate
                        ? item.endDate
                          ? dayjs(item.endDate).format(DATE_FORMAT)
                          : t('dictionary.present')
                        : t('general.no-data')
                    }
                  />
                  <Modalinfo
                    placeholder={t('patientSummary.social-history.frequency')}
                    value={
                      item.unit
                        ? item.value + ' ' + item.unit
                        : t('general.no-data')
                    }
                  />
                </ScrollView>
              </InformationCard>
            )}
            ListEmptyComponent={NoDataSection}
          />
          {loading && <Loading />}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SocialHistoryScreen;

const styles = StyleSheet.create({
  containerHeight: {
    height: '100%',
  },
});
