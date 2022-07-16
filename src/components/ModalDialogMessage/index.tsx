import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { Icon, ModalDialogCommon, Paragraph } from '~Root/components';
import { TouchableOpacity, View } from 'react-native';

import React from 'react';
import { adjust } from '~Root/utils';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Button from '~Root/components/Button';
import Tooltip from 'react-native-walkthrough-tooltip';
import Ionicons from "react-native-vector-icons/Ionicons"

interface Props {
  visibleModal: boolean;
  isDefault: boolean;
  onSelectIndividual: () => void;
  onSelectJoint: () => void;
  onVisibleModal: () => void;
}

const ModalDialogMessage: React.FC<Props> = ({
  visibleModal = false,
  isDefault = false,
  onSelectIndividual = () => { },
  onSelectJoint = () => { },
  onVisibleModal = () => { },
}) => {
  const { t } = useTranslation();
  const [showTooltip, setShowTooltip] = React.useState(false);

  const onTooltipPress = () => {
    setShowTooltip(!showTooltip);
  }

  return (
    <ModalDialogCommon
      isVisible={visibleModal}
      onHideModal={onVisibleModal}
      isDefault={isDefault}
      styleContainer={GlobalStyles.pb0}
      styleModal={{ ...GlobalStyles.styleModal, ...styles.styleModal }}
      styleModalContainer={GlobalStyles.styleModalContainer}>
      <View style={[GlobalStyles.pv20, GlobalStyles.ph20]}>
        <TouchableOpacity style={styles.closeIcon} onPress={onVisibleModal}>
          <Icon name='times' color={BASE_COLORS.blackColor} size={adjust(12)} />
        </TouchableOpacity>
        <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
          <Paragraph h5 textSteelBlueColor title={t('send_message')} style={[styles.item, styles.itemHeader]} />
          <Tooltip
            isVisible={showTooltip}
            backgroundColor='transparent'
            contentStyle={styles.tooltipContentStyle}
            content={
              <TouchableOpacity style={GlobalStyles.flexColumn} onPress={onTooltipPress}>
                <TouchableOpacity style={styles.tooltipCloseBtn} onPress={onTooltipPress}>
                  <Icon name='times' color={BASE_COLORS.whiteColor} size={adjust(12)} />
                </TouchableOpacity>
                <Paragraph
                  p
                  textWhite
                  title='Choose “send individual message” to send separate, private messages to one or both users.'
                  style={[GlobalStyles.mb10, GlobalStyles.mr30]}
                />
                <Paragraph
                  p
                  textWhite
                  title='Choose “send a joint message” to send one identical message to both users at one go.'
                  style={[GlobalStyles.mr30]}
                />
              </TouchableOpacity>
            }
            placement='bottom'>
            <TouchableOpacity onPress={onTooltipPress}>
              <Ionicons name='help-circle' color={BASE_COLORS.davysGreyColor} size={adjust(22)} />
            </TouchableOpacity>
          </Tooltip>
        </View>
        <Button
          title={t('individual_message')}
          textCenter
          containerStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
          onPress={onSelectIndividual}
        />
        <Button
          title={t('joint_message')}
          textCenter
          containerStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
          onPress={onSelectJoint}
        />
      </View>
    </ModalDialogCommon>
  );
};

export default ModalDialogMessage;
