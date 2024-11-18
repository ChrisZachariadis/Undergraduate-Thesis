import React from 'react';
import {Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useTranslation} from 'react-i18next';
import {
  horizontalScale,
  verticalScale,
} from '../../../../assets/styles/scaling';
import globalStyle from '../../../../assets/styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import styles from './style';

const DropdownComponent = ({value, setValue}) => {
  const {t} = useTranslation();

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const renderItem = (item: {label: string; value: string}) => {
    return (
      <View style={styles.item}>
        <Text style={globalStyle.descriptionBlackL2}>{item.label}</Text>
        {item.value === value && (
          <FontAwesomeIcon
            icon={faCheck}
            color="green"
            size={horizontalScale(17)}
          />
        )}
      </View>
    );
  };

  const data = [
    {label: t('shl.summary.show-all'), value: t('shl.summary.show-all')},
    {label: t('shl.summary.allergy'), value: t('shl.summary.allergy')},
    {label: t('shl.summary.intolerance'), value: t('shl.summary.intolerance')},
    {label: t('shl.summary.careplan'), value: t('shl.summary.careplan')},
    {label: t('shl.summary.problem'), value: t('shl.summary.problem')},
    {label: t('shl.summary.device'), value: t('shl.summary.device')},
    {label: t('shl.summary.diagnosis'), value: t('shl.summary.diagnosis')},
    {label: t('shl.summary.procedure'), value: t('shl.summary.procedure')},
    {
      label: t('shl.summary.immunization'),
      value: t('shl.summary.immunization'),
    },
    {label: t('shl.summary.vital-sign'), value: t('shl.summary.vital-sign')},
    {label: t('shl.summary.pregnancy'), value: t('shl.summary.pregnancy')},
    {
      label: t('shl.summary.social-history'),
      value: t('shl.summary.social-history'),
    },
    {
      label: t('shl.summary.travel-history'),
      value: t('shl.summary.travel-history'),
    },
    {
      label: t('shl.summary.medication'),
      value: t('shl.summary.medication'),
    },
    {
      label: t('shl.summary.consent'),
      value: t('shl.summary.consent'),
    },
  ];

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={globalStyle.descriptionBlackL2}
      selectedTextStyle={globalStyle.descriptionBlackL2}
      inputSearchStyle={globalStyle.descriptionBlackL2}
      data={data}
      autoScroll={false}
      search
      maxHeight={verticalScale(300)}
      labelField="label"
      valueField="value"
      placeholder={t('shl.summary.select-category')}
      searchPlaceholder={t('general.search')}
      value={value}
      onChange={item => {
        handleChange(item.value);
      }}
      renderItem={renderItem}
    />
  );
};

export default DropdownComponent;
