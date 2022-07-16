import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Button, Icon, ModalDialogCommon, Paragraph} from '~Root/components';
import {View, ViewStyle} from 'react-native';

import {AppRoute} from '~Root/navigation/AppRoute';
import {MainNavigatorParamsList} from '~Root/navigation/config';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {adjust} from '~Root/utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';

interface PropsNav {
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, AppRoute.HOME_DETAIL>;
}

interface Props {
  isVisible: boolean;
  isDefault: boolean;
  onHideModal: () => void;
  styleModal?: ViewStyle;
  onModalVisible?: () => void;
  onEnd: () => void;
}

const ModalExpire: React.FC<Props & PropsNav> = ({
  isVisible = false,
  isDefault = false,
  onHideModal = () => {},
  styleModal = {},
  navigation,
  onModalVisible = () => {},
  onEnd = () => {},
}) => {
  const {t} = useTranslation();

  return (
    <ModalDialogCommon
      isVisible={isVisible}
      onHideModal={onHideModal}
      isDefault={isDefault}
      styleModal={{...styles.styleModal, ...styleModal}}
      styleModalContainer={styles.styleModalContainer}>
      <Paragraph textCenter textIndianRedColor bold title={t('ask_expire')} style={styles.modalHeader} />
      <View style={[GlobalStyles.flexColumn, styles.buttonGroup]}>
        <Button
          isIconLeft={true}
          title={t('extend_deadline')}
          bordered
          h3
          textCenter
          onPress={onModalVisible}
          containerStyle={styles.buttonContainerStyle}
          textStyle={styles.h5BoldDefault}>
          <Icon name='calendar-week' color={BASE_COLORS.blackColor} size={adjust(12)} style={GlobalStyles.mr10} />
        </Button>
        <Button
          isIconLeft={true}
          title={t('end_this_ask')}
          bordered
          h3
          textCenter
          onPress={onEnd}
          containerStyle={styles.buttonContainerStyle}
          textStyle={styles.h5BoldDefault}>
          <Icon name='times-circle' color={BASE_COLORS.blackColor} size={adjust(12)} style={GlobalStyles.mr10} />
        </Button>
      </View>
    </ModalDialogCommon>
  );
};

export default ModalExpire;
