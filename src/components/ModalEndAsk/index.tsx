import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Icon, ModalDialogCommon, Paragraph} from '~Root/components';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

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
  onFoundResponse: () => void;
  onEndAskNotFoundResponder: () => void;
}

const ModalEndAsk: React.FC<Props & PropsNav> = ({
  isVisible = false,
  isDefault = false,
  onHideModal = () => {},
  styleModal = {},
  onFoundResponse = () => {},
  onEndAskNotFoundResponder = () => {},
}) => {
  const {t} = useTranslation();

  return (
    <ModalDialogCommon
      isVisible={isVisible}
      onHideModal={onHideModal}
      isDefault={isDefault}
      styleModal={{...styles.styleModal, ...styleModal}}
      styleModalContainer={styles.styleModalContainer}>
      <Paragraph h5 textCenter textSteelBlueColor bold title={t('end_ask')} />
      <View style={[GlobalStyles.flexColumn, styles.buttonGroup]}>
        <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.pv15]} onPress={onFoundResponse}>
          <Paragraph textCenter h5 textEerieBlackColor title={t('found_a_response')} style={GlobalStyles.container} />
          <Icon name='arrow-alt-circle-right' size={adjust(18)} color={BASE_COLORS.eerieBlackColor} />
        </TouchableOpacity>
        <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.pv15]} onPress={onEndAskNotFoundResponder}>
          <Paragraph
            textCenter
            h5
            textEerieBlackColor
            title={t('not_found_a_response')}
            style={GlobalStyles.container}
          />
          <Icon name='arrow-alt-circle-right' size={adjust(18)} color={BASE_COLORS.eerieBlackColor} />
        </TouchableOpacity>
      </View>
    </ModalDialogCommon>
  );
};

export default ModalEndAsk;
