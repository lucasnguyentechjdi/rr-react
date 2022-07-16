import { TextInput, View } from 'react-native';
import { ModalDialogCommon, Paragraph } from '~Root/components';
import { BASE_COLORS, GlobalStyles } from '~Root/config';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import styles from './styles';

interface Props {
  visibleModal: boolean;
  isDefault: boolean;
  onCancel: () => void;
  onDone: (message: string) => void;
  onVisibleModal: () => void;
}

const ModalDialogReport: React.FC<Props> = ({
  visibleModal = false,
  isDefault = false,
  onCancel = () => { },
  onDone = () => { },
  onVisibleModal = () => { },
}) => {
  const { t } = useTranslation();
  const [message, setMessage] = React.useState('');

  const onChange = (text: string) => {
    setMessage(text);
  };

  return (
    <ModalDialogCommon
      isVisible={visibleModal}
      styleModal={styles.modal}
      onHideModal={onVisibleModal}
      isDefault={isDefault}>
      <View style={[GlobalStyles.pv10]}>
        <Paragraph h5 textBlack bold textCenter title={t('report_ask')} style={styles.item} />
        <TextInput
          onChangeText={onChange}
          value={message}
          selectionColor={BASE_COLORS.whiteColor}
          style={styles.inputStyle}
          placeholder={t('reason_report')}
          placeholderTextColor={BASE_COLORS.lightPinkColor}
          multiline={true}
          numberOfLines={3}
          editable={true}
        />
        <View style={[GlobalStyles.flexRow, styles.buttonGroup]}>
          <Button
            title={t('cancel')}
            bordered
            h3
            textCenter
            onPress={onCancel}
            containerStyle={styles.buttonContainerStyle}
            textStyle={styles.h5BoldDefault}
          />
          <Button
            title={t('send_report')}
            bordered
            h3
            textCenter
            onPress={() => onDone(message)}
            containerStyle={styles.buttonPrimaryContainerStyle}
            textStyle={styles.h5BoldDefault}
          />
        </View>
      </View>
    </ModalDialogCommon>
  );
};

export default ModalDialogReport;
