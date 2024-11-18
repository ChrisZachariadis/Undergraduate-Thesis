import React, {useMemo, useState} from 'react';
import {
  Animated,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyle from '../../../../assets/styles/globalStyle';
import QRCode from 'react-native-qrcode-svg';
import {useTranslation} from 'react-i18next';
import {horizontalScale} from '../../../../assets/styles/scaling';
import {
  copyToClipboard,
  sendEmail,
  showAlertAndOpenURL,
} from '../../../../features/SHL/viewSHL';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faCopy,
  faEye,
  faShareNodes,
  faTriangleExclamation,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import {useRecoilState} from 'recoil';
import {userState} from '../../../../features/recoil/atoms/User/userState';
import dayjs from 'dayjs';
import {DATE_TIME_FORMAT} from '../../../../common/constants/constants';
import styles from './styles';
import {IShl} from '../../../../features/recoil/interfaces/IShl';

const ViewLink = (props: {data: IShl}) => {
  const {t} = useTranslation();
  const [user, _] = useRecoilState(userState);
  const [flipped, setFlipped] = useState(false);
  const VIEWER_LINK = 'https://dev-ehr.ehealth4u.eu/ips#shlink:/';
  let LINK = VIEWER_LINK + props.data.shl;

  const flipAnimation = useState(new Animated.Value(0))[0];
  let flipRotation = 0;

  flipAnimation.addListener(({value}) => {
    flipRotation = value;
  });

  const flipCard = () => {
    let toValue = flipped ? 0 : 180;
    setFlipped(!flipped);
    Animated.spring(flipAnimation, {
      toValue: toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontAnimatedStyle = useMemo(
    () => ({
      opacity: flipAnimation.interpolate({
        inputRange: [0, 90, 180],
        outputRange: [1, 0, 0],
      }),
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          }),
        },
      ],
    }),
    [flipAnimation],
  );

  const backAnimatedStyle = useMemo(
    () => ({
      opacity: flipAnimation.interpolate({
        inputRange: [0, 90, 180],
        outputRange: [0, 0, 1],
      }),
      transform: [
        {
          rotateY: flipAnimation.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
          }),
        },
      ],
    }),
    [flipAnimation],
  );
  return (
    <SafeAreaView style={globalStyle.fullyCentered}>
      <Animated.View style={[styles.backContainer, backAnimatedStyle]}>
        <View style={styles.infoContainer}>
          {/* Statistics Information*/}
          <View style={styles.statisticsContainer}>
            <View style={[globalStyle.fullyCentered, styles.borderColor]}>
              <View style={styles.row}>
                <FontAwesomeIcon
                  icon={faEye}
                  size={horizontalScale(20)}
                  color="grey"
                />
                <Text style={styles.infoText}>
                  {' '}
                  {t('shl.viewing.access-count')}
                </Text>
              </View>

              <Text style={styles.statisticsText}>
                {props.data.accessCount}
              </Text>
            </View>
            <View style={[globalStyle.fullyCentered, styles.borderColor]}>
              <View style={styles.row}>
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                  size={horizontalScale(20)}
                  color="grey"
                />
                <Text style={styles.infoText}>
                  {' '}
                  {t('shl.viewing.failed-attempts')}
                </Text>
              </View>

              <Text style={styles.statisticsText}>
                {props.data.failedAccessCount}
              </Text>
            </View>
          </View>

          {/* Date Information */}
          <View style={styles.datesContainer}>
            <Text style={styles.infoText}>
              {t('shl.viewing.published-date')}:
            </Text>
            <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
              {dayjs(props.data.creationDate).format(DATE_TIME_FORMAT)}
            </Text>
            <Text style={styles.infoText}>
              {t('shl.viewing.expiration-date')}:
            </Text>
            <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
              {dayjs(props.data.expirationDate).format(DATE_TIME_FORMAT)}
            </Text>
          </View>

          <Text style={styles.infoText}>
            {t('shl.viewing.instructions-placeholder')}:
          </Text>
          <Text style={[globalStyle.descriptionBlackL1, styles.dates]}>
            {t('shl.viewing.instructions')}
          </Text>

          <TouchableOpacity
            disabled={!flipped}
            style={styles.flipButton}
            onPress={() => flipCard()}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              color="#414141"
              size={horizontalScale(20)}
            />
            <Text style={globalStyle.descriptionBlackL1}>{'   '}Back</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.View style={[globalStyle.fullyCentered, frontAnimatedStyle]}>
        <View>
          <QRCode
            value={LINK}
            size={horizontalScale(300)}
            logo={require('../../../../assets/images/smart-logo.png')}
            logoSize={horizontalScale(40)}
          />
        </View>
        <View style={[globalStyle.fullyCentered, styles.actionsContainer]}>
          <Text style={styles.accessText}>{t('shl.viewing.pin')}</Text>
          <Text style={styles.pinText}>
            {' '}
            {props.data.passcode !== 'Unknown'
              ? props.data.passcode
              : t('shl.viewing.unknown-pin')}
          </Text>

          <View style={styles.actionButtonRow}>
            <View style={globalStyle.fullyCentered}>
              <TouchableOpacity
                disabled={flipped}
                style={[
                  globalStyle.Button,
                  styles.actionButtonsSHL,
                  globalStyle.fullyCentered,
                ]}
                onPress={() => {
                  sendEmail(
                    '',
                    t('shl.viewing.emai-subject'),
                    t('shl.viewing.email-body-partA') +
                      LINK +
                      t('shl.viewing.email-body-partB') +
                      user.surname +
                      ' ' +
                      user.name,
                  );
                }}>
                <FontAwesomeIcon
                  icon={faShareNodes}
                  color="#f5f5f5"
                  size={horizontalScale(25)}
                />
              </TouchableOpacity>
              <Text
                style={[
                  globalStyle.descriptionBlackL1,
                  styles.actionButtotText,
                ]}>
                {t('shl.viewing.share')}
              </Text>
            </View>

            <View style={globalStyle.fullyCentered}>
              <TouchableOpacity
                disabled={flipped}
                style={[
                  globalStyle.Button,
                  styles.actionButtonsSHL,
                  globalStyle.fullyCentered,
                ]}
                onPress={() => {
                  copyToClipboard(
                    LINK,
                    t('shl.viewing.copy-alert'),
                    t('shl.viewing.copy-alert-continue'),
                  );
                }}>
                <FontAwesomeIcon
                  icon={faCopy}
                  color="#f5f5f5"
                  size={horizontalScale(22)}
                />
              </TouchableOpacity>
              <Text
                style={[
                  globalStyle.descriptionBlackL1,
                  styles.actionButtotText,
                ]}>
                {t('shl.viewing.copy')}
              </Text>
            </View>

            <View style={globalStyle.fullyCentered}>
              <TouchableOpacity
                disabled={flipped}
                style={[
                  globalStyle.Button,
                  styles.actionButtonsSHL,
                  globalStyle.fullyCentered,
                ]}
                onPress={() => {
                  showAlertAndOpenURL(
                    LINK,
                    t('shl.viewing.open-alert-title'),
                    t('shl.viewing.open-alert-description'),
                    t('shl.viewing.open-alert-cancel'),
                    t('shl.viewing.open-alert-continue'),
                  );
                }}>
                <FontAwesomeIcon
                  icon={faUpRightFromSquare}
                  color="#f5f5f5"
                  size={horizontalScale(22)}
                />
              </TouchableOpacity>
              <Text
                style={[
                  globalStyle.descriptionBlackL1,
                  styles.actionButtotText,
                ]}>
                {t('shl.viewing.open')}
              </Text>
            </View>
          </View>
        </View>
        {!flipped && (
          <TouchableOpacity
            disabled={flipped}
            style={styles.flipButton}
            onPress={() => flipCard()}>
            <Text style={globalStyle.descriptionBlackL1}>
              {t('shl.viewing.more-info')}
              {'   '}
            </Text>
            <FontAwesomeIcon
              icon={faArrowRight}
              color="#414141"
              size={horizontalScale(20)}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
};

export default ViewLink;
