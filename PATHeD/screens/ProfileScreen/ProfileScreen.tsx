import React from 'react';
import {Image, SafeAreaView, Text, View} from 'react-native';
import globalStyle from '../../assets/styles/globalStyle';
import styles from './style';
import {useTranslation} from 'react-i18next';
import Loading from '../../components/Loading/Loading';
import {ScrollView} from 'react-native-gesture-handler';
import {
  DATE_FORMAT,
  SYNCED_TIME_FORMAT,
} from '../../common/constants/constants';
import dayjs from 'dayjs';
import {getPatientInformation} from './api/patientInformationAPI';
import {IPatientInformation} from './interface/IPatientInformation';
import {useSyncedSummary} from '../../common/helpers/useSyncedSummary';

const ProfileScreen = () => {
  const {t} = useTranslation();

  const {data, loading, syncDate} = useSyncedSummary<IPatientInformation>(
    getPatientInformation,
    'patientInfo',
  );

  const InformationBox = ({labelKey, value}) => (
    <View style={styles.informationBox}>
      <Text style={[globalStyle.descriptionGrey, styles.marginLeft20]}>
        {t(labelKey)}
      </Text>
      <Text style={[globalStyle.descriptionBlackL3, styles.marginLeft20]}>
        {value
          ? value === ''
            ? t('general.no-data')
            : value
          : t('general.no-data')}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, {flex: 1}]}>
      {/* Profile Image and Name */}
      <ScrollView>
        <View style={styles.ProfileContainer}>
          <View style={styles.ImageContainer}>
            <Image
              tintColor={'#85CECA'}
              source={require('../../assets/images/Profile/default.png')}
              style={styles.ImageStyle}
            />
            <Text style={styles.ImageInitials}>
              {data?.givenName.at(0) ?? 'N'}
              {data?.familyName.at(0) ?? 'A'}
            </Text>
          </View>
          <Text style={[globalStyle.descriptionBlackL1, styles.Name]}>
            {data?.givenName} {data?.familyName}
          </Text>
        </View>
        <Text style={globalStyle.descriptionItalic}>
          {t('dates.lastSynchronized')}:{' '}
          {dayjs(syncDate).format(SYNCED_TIME_FORMAT)}
        </Text>
        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('patientSummary.profile.personal-details')}
          </Text>
          <InformationBox
            labelKey="patientSummary.profile.primary-id"
            value={data?.primaryID}
          />
          <InformationBox
            labelKey="patientSummary.profile.secondary-id"
            value={data?.secondaryID}
          />
          <InformationBox
            labelKey="dates.birth"
            value={
              data?.birthDate ? dayjs(data.birthDate).format(DATE_FORMAT) : null
            }
          />
          <InformationBox
            labelKey="patientSummary.profile.gender"
            value={data?.gender}
          />
          <InformationBox
            labelKey="patientSummary.profile.communication-language"
            value={data?.communicationLanguage}
          />
        </View>
        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('patientSummary.profile.contact-details')}
          </Text>
          <InformationBox
            labelKey="patientSummary.profile.email"
            value={data?.email}
          />
          <InformationBox
            labelKey="patientSummary.profile.mobile-phone"
            value={data?.mobilePhoneNumber}
          />
          <InformationBox
            labelKey="patientSummary.profile.home-phone"
            value={data?.homePhoneNumber}
          />
          <InformationBox
            labelKey="patientSummary.profile.address"
            value={`${data?.address ? data.address + ', ' : ''}${
              data?.postalCode ? data.postalCode + ', ' : ''
            }${data?.city ? data.city + ', ' : ''}${
              data?.country ? data.country : ''
            }`}
          />
        </View>

        <View style={styles.sections}>
          <Text style={styles.descriptions}>
            {t('patientSummary.profile.emergency.contact')}
          </Text>
          {data?.guardian ? (
            <View>
              <InformationBox
                labelKey="patientSummary.profile.emergency.name"
                value={`${data?.guardian.givenName} ${data?.guardian.familyName}`}
              />
              <InformationBox
                labelKey="patientSummary.profile.email"
                value={data?.guardian.email}
              />
              <InformationBox
                labelKey="patientSummary.profile.mobile-phone"
                value={data?.guardian.phone}
              />
              <InformationBox
                labelKey="patientSummary.profile.address"
                value={`${
                  data?.guardian.address ? data.guardian.address + ', ' : ''
                }${
                  data?.guardian.postalCode
                    ? data.guardian.postalCode + ', '
                    : ''
                }${data?.guardian.city ? data.guardian.city + ', ' : ''}${
                  data?.guardian.country ? data.guardian.country : ''
                }`}
              />
            </View>
          ) : (
            <Text style={[globalStyle.descriptionBlackL3, styles.marginLeft20]}>
              {t('general.no-data')}
            </Text>
          )}
        </View>
      </ScrollView>
      {/* Loading Animation */}
      {loading && <Loading />}
    </SafeAreaView>
  );
};

export default ProfileScreen;
