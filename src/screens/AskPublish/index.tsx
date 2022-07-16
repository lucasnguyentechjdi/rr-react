import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Share, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {HeaderSmallBlue, Icon, ListItem, Loading, Paragraph} from '~Root/components';
import {MainNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {IGlobalState} from '~Root/types';
import {adjust} from '~Root/utils';
import styles from './styles';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.ASK_PREVIEW>;

const AskPublishScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

  const {data_ask_preview} = useSelector((state: IGlobalState) => state.askState);

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: adjust(20),
  });

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: data_ask_preview?.line1,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderSmallBlue onBack={onBack} isBackButton={true} title={`${t('create_ask')}`} />
      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView contentContainerStyle={GlobalStyles.scrollViewFullScreen}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.container, GlobalStyles.mh15, GlobalStyles.mb65]}>
              <Paragraph
                h5
                textBlack
                textCenter
                title={t('published_ask').toUpperCase()}
                style={[GlobalStyles.mv15, styles.title]}
              />
              <View style={GlobalStyles.container}>
                <ListItem
                  tagStyleContainer={GlobalStyles.askTagStyleContainer}
                  tagStyle={GlobalStyles.askTagStyle}
                  showDeadline={false}
                  {...data_ask_preview}
                />
              </View>
              <TouchableOpacity onPress={onShare} style={GlobalStyles.itemCenter}>
                <Icon name='share-square' size={adjust(20)} color={BASE_COLORS.steelBlueColor} />
                <Paragraph h4 textBlack bold600 textCenter title={t('share_this_ask')} style={GlobalStyles.mt10} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};
export default AskPublishScreen;
