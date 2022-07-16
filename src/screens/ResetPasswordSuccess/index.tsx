import {Button, HeaderSmallBlue, Paragraph} from '~Root/components';

import {AppRoute} from '~Root/navigation/AppRoute';
import {GlobalStyles} from '~Root/config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import SuccessIcon from './icon/success';
import {View} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.RESET_PASSWORD>;

const ResetPasswordSuccessScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[GlobalStyles.container, styles.containerFull]}>
      <HeaderSmallBlue title={t('referreach')} onBack={onBack} isBackButton={true} />
      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <View style={styles.container}>
          <Paragraph h4 textCenter textBlack style={GlobalStyles.h3Title} title={t('reset_password')} />
          <SuccessIcon />
          <Paragraph h3 textCenter bold600 textBlack title={t('password_changed')} />
          <Paragraph p style={GlobalStyles.mt10} textCenter textBlack title={t('changed_success')} />
          <Button
            title={t('go_to_login')}
            h3
            textCenter
            bordered
            onPress={() => navigation.navigate(AppRoute.LOGIN)}
            containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
            textStyle={styles.h3BoldDefault}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ResetPasswordSuccessScreen;
