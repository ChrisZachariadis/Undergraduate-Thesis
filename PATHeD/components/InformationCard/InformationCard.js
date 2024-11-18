import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import styles from './style';
import PropTypes from 'prop-types';
import ModalComponent from '../ModalComponent/ModalComponent';
import globalStyle from '../../assets/styles/globalStyle';
import {RISK_COLOURS} from '../../common/constants/constants';

const InformationCard = props => {
  const [CHARACTER_LIMIT, setCHARACTER_LIMIT] = useState(23);

  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const [row2Flag, setrow2Flag] = useState(true);
  const [riskFlag, setRiskFlag] = useState(true);
  const [statusFlag, setstatusFlag] = useState(true);
  const [onsetFlag, setonsetFlag] = useState(true);
  const [row1TopMargin, setrow1TopMargin] = useState(10);
  const [row3TopMargin, setrow3TopMargin] = useState(0);
  const [riskTest, setRiskTest] = useState('Unknown');
  const [riskColor, setriskColor] = useState(RISK_COLOURS.UNKNOWN);
  const [statusColor, setstatusColor] = useState('#76A66E');

  useEffect(() => {
    if (props.type === 'Medical') {
      setrow2Flag(false);
      setrow1TopMargin(20);
      setrow3TopMargin(10);
    } else if (
      props.type === 'Procedure' ||
      props.type === 'Travel' ||
      props.type === 'Social History' ||
      props.type === 'Immunization' ||
      props.type === 'PlanOfCare'
    ) {
      setCHARACTER_LIMIT(40);
      setRiskFlag(false);
      setstatusFlag(false);
      setonsetFlag(false);
    } else {
    }
  }, [props.type]);

  useEffect(() => {
    if (props.type === 'Allergy') {
      if (props.risk === 'High Risk') {
        setRiskTest('High Risk');
        setriskColor(RISK_COLOURS.HIGH);
      } else if (props.risk === 'Moderate') {
        setRiskTest('Moderate');
        setriskColor(RISK_COLOURS.MODERATE);
      } else if (props.risk === 'Low Risk') {
        setRiskTest('Low Risk');
        setriskColor(RISK_COLOURS.LOW);
      }
    }
    if (props.type === 'Medication') {
      if (props.risk === 'completed') {
        setRiskTest('completed');
        setriskColor(RISK_COLOURS.LOW);
      } else if (props.risk === 'active') {
        setRiskTest('active');
        setriskColor(RISK_COLOURS.ACTIVE);
      } else {
        setRiskTest('pending');
        setriskColor(RISK_COLOURS.MODERATE);
      }
    }
  }, [props, props.type, props.risk]);

  useEffect(() => {
    if (props.type === 'Allergy') {
      if (props.status === 'Inactive') {
        setstatusColor('#ad1509');
      }
    }
    if (props.type === 'Medication') {
      setstatusColor('#ffffff');
    }
  }, [props.type, props.status]);

  return (
    <View style={styles.informationCardContainer}>
      <ModalComponent
        title={props.title}
        visibility={modalVisible}
        onClose={() => setModalVisible(false)}
        children={props.children}
      />

      <TouchableOpacity
        disabled={!props.hasModal}
        style={[styles.container, globalStyle.backgroundWhite]}
        onPress={() => toggleModal()}>
        {/* The first row includes the item of discussion and also if applicable its risk factor */}
        <View style={[globalStyle.row, {marginTop: row1TopMargin}]}>
          <Text numberOfLines={1} style={globalStyle.descriptionBlackL1}>
            {props.title.length < CHARACTER_LIMIT
              ? `${props.title}`
              : `${props.title.substring(0, CHARACTER_LIMIT)}...`}
          </Text>
          {riskFlag && (
            <View
              style={[
                styles.risk_Container,
                globalStyle.fullyCentered,
                {backgroundColor: riskColor},
              ]}>
              <Text style={styles.risk_Caption}>{riskTest}</Text>
            </View>
          )}
        </View>
        {/* The second row is only for the Allergy Information and describes the type of Allergy and status */}
        {row2Flag && (
          <View style={[globalStyle.row, styles.marginTop5]}>
            <Text numberOfLines={1} style={globalStyle.descriptionGrey}>
              {props.TopSubtitle.length < CHARACTER_LIMIT
                ? `${props.TopSubtitle}`
                : `${props.TopSubtitle.substring(0, CHARACTER_LIMIT)}...`}
            </Text>
            {statusFlag && (
              <View style={styles.status_container}>
                <Text style={[styles.cirlce, {color: statusColor}]}>⬤</Text>
                <Text style={styles.caption}>{props.status}</Text>
              </View>
            )}
          </View>
        )}

        {/* The third row is additional information and if applicable the onset date */}
        <View style={[globalStyle.row, {marginTop: row3TopMargin}]}>
          <Text numberOfLines={1} style={globalStyle.descriptionGrey}>
            {props.BottomSubtitle.length < CHARACTER_LIMIT
              ? `${props.BottomSubtitle}`
              : `${props.BottomSubtitle.substring(0, CHARACTER_LIMIT)}...`}
          </Text>
          {onsetFlag && <Text style={styles.caption}>From {props.onset}</Text>}
        </View>
      </TouchableOpacity>
    </View>
  );
};

InformationCard.propTypes = {
  modaltext: PropTypes.string,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  hasModal: PropTypes.bool,
  TopSubtitle: PropTypes.string,
  BottomSubtitle: PropTypes.string,
  risk: PropTypes.string,
  status: PropTypes.string,
  onset: PropTypes.string,
  children: PropTypes.node,
};

InformationCard.defaultProps = {
  hasModal: true,
};

export default InformationCard;
