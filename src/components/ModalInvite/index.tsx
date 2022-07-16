import {Pressable, View} from 'react-native';

import {Paragraph} from '~Root/components';
import React from 'react';
import styles from './styles';

interface Props {
  onHideModal: () => void;
  onInvite: () => void;
  onClaim: () => void;
}
const ModalInvite = ({onHideModal, onInvite, onClaim}: Props) => {
  const handleInvite = () => {
    onInvite();
    onHideModal();
  };

  const handleClaim = () => {
    onClaim();
    onHideModal();
  };

  return (
    <Pressable onPress={onHideModal} style={styles.mainContainer}>
      <View style={styles.container}>
        {/* <Pressable style={[styles.option, styles.borderBottomOption]}>
          <Paragraph bold600 textCenter textBlack p title='Trust Network' />
        </Pressable> */}
        <Pressable onPress={handleInvite} style={[styles.option, styles.borderBottomOption]}>
          <Paragraph bold600 textTealBlue textCenter textBlack p title='Send an Invite' />
        </Pressable>
        <Pressable onPress={handleClaim} style={styles.option}>
          <Paragraph bold600 textTealBlue textCenter textBlack p title='Input Invite Code' />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default ModalInvite;
