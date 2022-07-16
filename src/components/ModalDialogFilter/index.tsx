import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { Icon, ModalDialogCommon, Paragraph } from '~Root/components';
import { TouchableOpacity, View } from 'react-native';

import React, { Dispatch, SetStateAction } from 'react';
import { adjust } from '~Root/utils';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Button from '~Root/components/Button';
import Tooltip from 'react-native-walkthrough-tooltip';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  visibleModal: boolean;
  isDefault: boolean;
  onVisibleModal: () => void;
  onApplyFilter: () => void;
  setFrom: Dispatch<SetStateAction<string>>;
  setFilter: Dispatch<SetStateAction<string>>;
  filter: string;
  from: string;
}

const ModalDialogFilter: React.FC<Props> = ({
  visibleModal = false,
  isDefault = false,
  onVisibleModal = () => {},
  onApplyFilter = () => {},
  from,
  filter,
  setFrom,
  setFilter,
}) => {
  const { t } = useTranslation();
  const resetFilter = () => {
    setFilter('');
    setFrom('');
  };

  const buttonComponent = (text: string, active: boolean, onPress: any) => {
    return (
      <TouchableOpacity onPress={onPress} style={active ? styles.filterButtonActive : styles.filterButton}>
        <Paragraph bold600 title={t(text)} style={active ? styles.textBtnFilterActive : styles.textBtnFilter} />
      </TouchableOpacity>
    );
  };

  const buttonComponentMR = (text: string, active: boolean, onPress: any) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[active ? styles.filterButtonActive : styles.filterButton, GlobalStyles.mr10]}>
        <Paragraph bold600 title={t(text)} style={active ? styles.textBtnFilterActive : styles.textBtnFilter} />
      </TouchableOpacity>
    );
  };

  return (
    <ModalDialogCommon
      isVisible={visibleModal}
      onHideModal={onVisibleModal}
      isDefault={isDefault}
      styleContainer={GlobalStyles.pb0}
      styleModal={{ ...GlobalStyles.styleModal, ...styles.styleModal }}
      styleModalContainer={styles.styleModalContainer}>
      <View style={[GlobalStyles.pv20, GlobalStyles.ph20]}>
        <View style={styles.content}>
          <View style={GlobalStyles.headerJustifyBetween}>
            <Paragraph h5 title={t('Show Asks created by:')} style={[styles.itemHeader]} />
            <TouchableOpacity onPress={resetFilter}>
              <Paragraph h5 title={t('Reset')} style={[styles.resetText]} />
            </TouchableOpacity>
          </View>
          <View style={GlobalStyles.flexRow}>
            {buttonComponentMR('All Degree', filter === 'all', () => setFilter('all'))}
            {buttonComponent('1st Degree', filter === '1st', () => setFilter('1st'))}
          </View>
          <View style={GlobalStyles.mt10}>
            {buttonComponent('2nd Degree', filter === '2nd', () => setFilter('2nd'))}
          </View>
          <Paragraph h5 title={t('And Asks from:')} style={[styles.itemHeader]} />
          <View style={GlobalStyles.flexRow}>
            {buttonComponentMR('Past 24hr', from === '1day', () => setFrom('1day'))}
            {buttonComponent('Past 3 Days', from === '3days', () => setFrom('3days'))}
          </View>
          <View style={[GlobalStyles.flexRow, GlobalStyles.mt10]}>
            {buttonComponentMR('Past Week', from === '7days', () => setFrom('7days'))}
            {buttonComponent('Past Month', from === '1month', () => setFrom('1month'))}
          </View>
        </View>
        <Button
          title={t('Apply')}
          textCenter
          containerStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
          onPress={onApplyFilter}
        />
      </View>
    </ModalDialogCommon>
  );
};

export default ModalDialogFilter;
