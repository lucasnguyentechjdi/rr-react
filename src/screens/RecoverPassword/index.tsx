import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Button, HeaderSmallBlue, Link, Loading, Paragraph} from '~Root/components';
import {TouchableOpacity, View} from 'react-native';

import {AppRoute} from '~Root/navigation/AppRoute';
import EmailIcon from './icon/email';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import UserAPI from '~Root/services/user/apis';
import styles from './styles';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.RECOVER_PASSWORD>;

const RecoverPasswordScreen = ({navigation, route}: Props) => {
  const params = route.params;
  const {t} = useTranslation();

  if (!params.email) {
    navigation.goBack();
  }
  const onBack = () => {
    navigation.goBack();
  };

  const handleResend = async () => {
    const result = await UserAPI.forgotPassword(params.email);
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('send_email_recovery_password_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
  };

  const onContinue = () => {
    navigation.navigate(AppRoute.RESENT_PASSWORD, {email: params.email});
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <HeaderSmallBlue title={t('referreach')} onBack={onBack} isBackButton={true} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <View style={[styles.content]}>
          <View style={styles.titleContainer}>
            <Paragraph h3 textBlack bold600 title={t('forgot_password')} />
          </View>
          <View style={styles.icon}>
            <EmailIcon />
          </View>
          <Paragraph h4 textCenter style={GlobalStyles.mt30} textBlack bold600 title={t('please_check_email')} />
          <Paragraph p textBlack textCenter style={GlobalStyles.mt20} title={t('we_have_sent_the_password')} />
          <Button
            title={t('continue')}
            h3
            textCenter
            bordered
            onPress={onContinue}
            disabled={false}
            containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
            textStyle={styles.h3BoldDefault}
            bgVerifyColor={BASE_COLORS.oxleyColor}
          />
          <View style={[GlobalStyles.flexRow, styles.link, GlobalStyles.mt20]}>
            <Paragraph h5 title={t('not_get_email')} style={GlobalStyles.mr5} />
            <Link onPress={handleResend} h5 bold textBlack title={t('send_email')} textDecoration />
          </View>
        </View>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default RecoverPasswordScreen;
