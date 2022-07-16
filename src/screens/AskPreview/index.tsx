import React from 'react';
import { KeyboardAvoidingView, NativeModules, Platform, ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import { Button, HeaderSmallBlue, ListItem, Loading, Paragraph } from '~Root/components';
import { hideLoading, showLoading } from '~Root/services/loading/actions';
import { createAsk, updateAsk } from '~Root/services/ask/actions';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import { AppRoute } from '~Root/navigation/AppRoute';
import { GlobalStyles } from '~Root/config';
import { IGlobalState } from '~Root/types';
import { adjust } from '~Root/utils';
import styles from './styles';
import moment from 'moment';
import Toast from 'react-native-toast-message';
import { getUserAskData } from '~Root/services/user/actions';
import Flurry from 'react-native-flurry-sdk';
const { ReactNativeFlurry } = NativeModules;

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.ASK_PREVIEW>;

const AskPreviewScreen = ({ navigation }: Props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const { data_ask_preview, data_ask_selected } = useSelector((state: IGlobalState) => state.askState);
  const userState = useSelector((state: IGlobalState) => state.userState);

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: adjust(20),
  });

  const onPublish = () => {
    dispatch(showLoading());
    const code = data_ask_preview?.code;
    const body = { ...data_ask_preview };
    if (body.endDate) {
      body.endDate = moment(body.endDate).format('DD/MM/YYYY');
    }
    if (body?.data?.endDate) {
      body.data.endDate = moment(body.data.endDate).format('DD/MM/YYYY');
    }
    if (data_ask_selected?.code) {
      dispatch(
        updateAsk(data_ask_selected.code, body, (result: any) => {
          dispatch(hideLoading());
          Toast.show({
            position: 'bottom',
            type: result.success ? 'success' : 'error',
            text1: result.success ? t('update_ask_success') : result.message,
            visibilityTime: 2000,
            autoHide: true,
          });
          if (result.success) {
            const page = userState?.askPagination?.pageCurrent ?? 1;
            const limit = userState?.askPagination?.recordPerPage ?? 50;
            dispatch(getUserAskData(page, limit));
            navigation.navigate(AppRoute.YOUR_ASKS);
            // void analytics().logEvent('create_ask', body);
            Flurry.logEvent('Update_Ask', { data: JSON.stringify(result.data) });
          }
        }),
      );
      return;
    }
    dispatch(
      createAsk(code, body, (result: any) => {
        dispatch(hideLoading());
        Toast.show({
          position: 'bottom',
          type: result.success ? 'success' : 'error',
          text1: result.success ? t('create_ask_success') : result.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        if (result.success) {
          const page = userState?.askPagination?.pageCurrent ?? 1;
          const limit = userState?.askPagination?.recordPerPage ?? 50;
          dispatch(getUserAskData(page, limit));
          navigation.navigate(AppRoute.YOUR_ASKS);
          Flurry.logEvent('Create_Ask', { data: JSON.stringify(result.data) });
        }
      }),
    );
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderSmallBlue
        onBack={onBack}
        isBackButton={true}
        title={`${t(data_ask_selected ? 'update_ask' : 'create_ask')}`}
      />
      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView contentContainerStyle={GlobalStyles.scrollViewFullScreen}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.mb65]}>
              <Paragraph h5 textBlack textCenter title={t('preview_ask')} style={[GlobalStyles.mv15, styles.title]} />
              <View style={GlobalStyles.container}>
                <ListItem
                  showDate={false}
                  tagStyle={GlobalStyles.askTagStyle}
                  item={data_ask_preview}
                  limitLine={false}
                />
              </View>
              <View style={styles.mainButtonContainer}>
                <Button
                  bordered
                  title={t('publish')}
                  onPress={onPublish}
                  containerStyle={styles.mainButtonArea}
                  textStyle={styles.textStyle}
                />
              </View>
              {/* <Paragraph italic title={t('ask_cannot_edited')} style={[GlobalStyles.mt20, styles.askHighlight]} /> */}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};
export default AskPreviewScreen;
