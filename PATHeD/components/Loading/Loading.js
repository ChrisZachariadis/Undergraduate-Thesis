import React from 'react';
import {Animated, Easing, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import styles from './style';

const Loading = () => {
  const {t} = useTranslation();
  const spinValue = new Animated.Value(0);

  // First set up animation
  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }),
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  return (
    <View style={styles.loadingContainer}>
      <Animated.Image
        style={{transform: [{rotate: spin}]}}
        source={require('../../assets/images/Login/loading.png')}
      />
      <Text style={styles.loadingText}>{t('general.loading')}</Text>
    </View>
  );
};

export default Loading;
