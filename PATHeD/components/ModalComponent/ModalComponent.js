//Basics
import React from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

// Styles
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import {SafeAreaView} from 'react-native-safe-area-context';

const ModalComponent = props => {
  return (
    <SafeAreaView>
      <Modal
        visible={props.visibility}
        animationType="fade"
        transparent={true}
        onRequestClose={props.onClose}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={[styles.modalView, globalStyle.backgroundWhite]}>
            <View style={[globalStyle.row, styles.modaltitle]}>
              <Text style={[globalStyle.descriptionBlackL1, {fontWeight: 600}]}>
                {props.title}
              </Text>
              <TouchableOpacity
                style={styles.closeContainer}
                onPress={props.onClose}>
                <FontAwesomeIcon icon={faXmark} size={25} color="grey" />
              </TouchableOpacity>
            </View>
            {props.children}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  visibility: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
export default ModalComponent;
