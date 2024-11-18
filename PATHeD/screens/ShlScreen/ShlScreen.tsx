import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import globalStyle from '../../assets/styles/globalStyle';
import {horizontalScale} from '../../assets/styles/scaling';
import {faInfo} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import ShlGeneration from './components/ShlGeneration/ShlGeneration';
import ResourceSelection from './components/ResourceSelection/ResourceSelection';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import {useRecoilState} from 'recoil';
import {SummaryResources} from '../../features/recoil/atoms/SummaryResources/SummaryResources';
import {summaryResourcesState} from '../../features/recoil/atoms/SummaryResources/summaryResourcesState';
import ShlHistory from '../../components/ShlHistory/shlHistory';

// TODO: Put create button on bottom
// TODO: Make history discrete
// TODO: Make delete as in emails
// TODO: Make the view more appealing
const ShlScreen = () => {
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);

  const [summaryResources, setSummaryResources] = useRecoilState(
    summaryResourcesState,
  );

  return (
    <SafeAreaView style={styles.container}>
      <ModalComponent
        title={t('shl.info-title')}
        visibility={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}>
        <ScrollView>
          <Text style={[globalStyle.descriptionBlackL2, styles.infoContainer]}>
            {t('shl.info')}
          </Text>
        </ScrollView>
      </ModalComponent>

      <ModalComponent
        title={
          !summaryResources.ready
            ? t('shl.selection-title')
            : t('shl.generation-title')
        }
        visibility={modalVisible}
        onClose={() => {
          setSummaryResources(new SummaryResources(false, []));
          setModalVisible(false);
        }}>
        <View>
          {!summaryResources.ready ? (
            <ResourceSelection />
          ) : (
            <ShlGeneration closeModal={setModalVisible} />
          )}
        </View>
      </ModalComponent>

      <TouchableOpacity
        onPress={() => {
          setInfoModalVisible(true);
        }}>
        <View style={styles.infoIconContainer}>
          <FontAwesomeIcon
            icon={faInfo}
            color="#212121"
            size={horizontalScale(16)}
          />
        </View>
      </TouchableOpacity>

      <View style={styles.screenContainer}>
        <Text style={styles.myLinksText}>{t('shl.previous')}</Text>
        <ShlHistory />
        <View style={[styles.createContainer, globalStyle.fullyCentered]}>
          <TouchableOpacity
            style={[globalStyle.Button]}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text style={globalStyle.buttonText}>{t('shl.create')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShlScreen;
