import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import globalStyle from '../../../../assets/styles/globalStyle';
import {IGynecological} from './interface/IGynecological';
import {getPregnancyInfo} from './api/gynaecologicalHistoryAPI';
import dayjs from 'dayjs';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../../../common/constants/constants';
import {verticalScale} from '../../../../assets/styles/scaling';
import NoDataSection from '../../../../components/NoDataSection/NoDataSection';
import Loading from '../../../../components/Loading/Loading';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBaby,
  faCakeCandles,
  faChildren,
} from '@fortawesome/free-solid-svg-icons';
import styles from './styles';
import {useSyncedSummary} from '../../../../common/helpers/useSyncedSummary';

const GynecologicalHistoryScreen = () => {
  const {t} = useTranslation();

  let {data, loading, syncDate} = useSyncedSummary<IGynecological>(
    getPregnancyInfo,
    'pregnancies',
  );

  if (!data?.availableInformation) {
    return (
      <SafeAreaView>
        <View style={[globalStyle.marginTop60, styles.container]}>
          <NoDataSection />
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView>
      <View style={[globalStyle.marginTop60, styles.container]}>
        <Text style={globalStyle.descriptionItalic}>
          {t('dates.lastSynchronized')}:{' '}
          {dayjs(syncDate).format(SYNCED_TIME_FORMAT)}
        </Text>
        <View style={[styles.pregnancyContainer, styles.marginTop]}>
          <View style={styles.imageContainer}>
            <FontAwesomeIcon
              icon={faBaby}
              size={verticalScale(70)}
              color={'#f4fbff'}
            />
          </View>
          <View style={globalStyle.fullyCentered}>
            <Text style={globalStyle.descriptionGrey}>
              {t('dates.expected-delivery')}
            </Text>
            <Text style={globalStyle.descriptionBlackL1}>
              {data?.deliveryDate
                ? dayjs(data.deliveryDate).format(DATE_FORMAT)
                : t('general.no-data')}
            </Text>
          </View>

          <View style={[styles.marginTop, globalStyle.fullyCentered]}>
            <Text style={globalStyle.descriptionGrey}>
              {t('dates.observation')}
            </Text>
            <Text style={globalStyle.descriptionBlackL1}>
              {data?.observationDate
                ? dayjs(data.observationDate).format(DATE_FORMAT)
                : t('general.no-data')}
            </Text>
          </View>

          <View style={[styles.marginTop, styles.childerContainer]}>
            <FontAwesomeIcon icon={faChildren} size={verticalScale(40)} />
            <Text style={[globalStyle.descriptionGrey, styles.childerMargins]}>
              {t('patientSummary.gynaecological.children')}
            </Text>
          </View>
          <Text style={globalStyle.descriptionBlackL1}>
            {data?.numberOfChildren || t('general.no-data')}
          </Text>

          <View style={styles.birthdaysContainer}>
            <FontAwesomeIcon icon={faCakeCandles} size={30} />
            <Text style={[globalStyle.descriptionGrey, styles.birthdaysText]}>
              {t('dates.outcome')}
            </Text>
          </View>

          {data.numberOfChildren > 0 &&
            data.outcomeDates &&
            data?.outcomeDates.split(',').map((date, index) => (
              <Text style={globalStyle.descriptionBlackL1} key={index}>
                {dayjs(date).format(DATE_FORMAT)}
              </Text>
            ))}

          <Text style={[styles.marginTop, globalStyle.descriptionGrey]}>
            {t('patientSummary.gynaecological.abortions')}
          </Text>
          <Text style={globalStyle.descriptionBlackL1}>
            {data?.abortions || t('general.no-data')}
          </Text>
        </View>
      </View>
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default GynecologicalHistoryScreen;
