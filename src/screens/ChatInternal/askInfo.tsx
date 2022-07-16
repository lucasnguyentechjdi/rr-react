import {Animated, Easing, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Button, Icon, ListItem, ModalChangeDeadLine, ModalEndAsk, Paragraph} from '~Root/components';
import React, {useEffect, useState} from 'react';
import {askLocation, askTitle, checkAskIsEnd, setAskSelected} from '~Root/services/ask/actions';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import AskAPI from '~Root/services/ask/apis';
import {CHAT_MEMBER_ROLE} from '~Root/services/chat/types';
import {IGlobalState} from '~Root/types';
import Toast from 'react-native-toast-message';
import {adjust} from '~Root/utils';
import {getAskDetail} from '~Root/services/chat/actions';
import {getUserAskData} from '~Root/services/user/actions';
import moment from 'moment';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Header from './header';

const ChatAskInfo = ({navigation, roleText}: any) => {
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const [animation, setAnimation] = useState({
    expanded: false,
    opacity: new Animated.Value(0),
    height: new Animated.Value(0),
  });
  const {userInfo} = useSelector((state: IGlobalState) => state.userState);
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const {chatInfo, askInfo} = useSelector((state: IGlobalState) => state.chatState);
  if (!chatInfo) {
    navigation.goBack();
  }
  const currentUser = chatInfo?.members.find(member => member.userCode === userInfo.code);
  const [isVisibleDeadline, setIsVisibleDeadline] = useState(false);
  const [isVisibleEndAsk, setModalEndAskVisible] = useState(false);

  const onShowParticipant = () => {
    navigation.navigate(AppRoute.VIEW_PARTICIPANT);
  };

  const onToggle = () => {
    Animated.timing(animation?.height, {
      toValue: animation?.expanded ? 0 : 1,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation?.opacity, {
        toValue: animation?.expanded ? 0 : 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: false,
      }).start();
    });

    setAnimation({...animation, expanded: !animation?.expanded});
  };

  const heightAnim = animation.height.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  const askContent = () => {
    const title = `${askInfo?.content.target ?? ''} ${askInfo?.content.detail ?? ''}`;
    return `${title} ${askInfo?.content.info ?? ''} `;
  };

  const onModalVisibleDeadline = () => {
    setIsVisibleDeadline(!isVisibleDeadline);
  };

  const onChangeDeadLineSuccess = () => {
    if (!askInfo) return;
    dispatch(getAskDetail(askInfo.code));
    const page = userState?.askPagination?.pageCurrent ?? 1;
    const limit = userState?.askPagination?.recordPerPage ?? 50;
    dispatch(getUserAskData(page, limit));
    setIsVisibleDeadline(!isVisibleDeadline);
  };

  const onEndAsk = () => {
    setModalEndAskVisible(!isVisibleEndAsk);
  };

  const onFoundResponse = () => {
    setModalEndAskVisible(false);
    navigation.navigate(AppRoute.FEED_BACK_MODAL);
  };

  const onEndAskNotFoundResponder = async () => {
    if (!askInfo) return;
    const body: any = {
      feedback: false,
    };
    const result = await AskAPI.endAsk(askInfo?.code, body);
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('end_ask_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      setModalEndAskVisible(false);
      navigation.goBack();
    }
  };

  useEffect(() => {
    if (!askInfo) {
      dispatch(setAskSelected(askInfo));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {askInfo && (
        <>
          <View style={[GlobalStyles.flexRow, GlobalStyles.ph10, GlobalStyles.pv15, styles.askInfoBlue]}>
            <View style={[GlobalStyles.flexRow, GlobalStyles.ph15, GlobalStyles.container]}>
              <View style={styles.contentContainer}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.fullWidth]}>
                  <View
                    style={[
                      styles.tagStyleContainer,
                      checkAskIsEnd(askInfo) ? styles.tagMaxWidth : {},
                      GlobalStyles.mb5,
                    ]}>
                    <Paragraph title={askInfo?.askType?.name} style={[styles.tagStyle, GlobalStyles.textUppercase]} />
                  </View>
                  {checkAskIsEnd(askInfo) && (
                    <View style={[styles.askEndStyleContainer, GlobalStyles.mb5]}>
                      <Paragraph
                        title={'Ask Ended'}
                        textWhite
                        style={[styles.labelEndStyle, GlobalStyles.textUppercase]}
                      />
                    </View>
                  )}
                </View>
                <View style={[GlobalStyles.mb5]}>
                  <Text style={GlobalStyles.mb5}>
                    <Paragraph textWhite style={styles.textBold} title={`${askInfo?.content?.target ?? ''}`} />
                    <Paragraph textWhite style={styles.textNormal} title={` ${askInfo?.content?.detail ?? ''}`} />
                  </Text>
                  <View style={GlobalStyles.flexRow}>
                    <Text>
                      <Text style={styles.textNormal}>{'For '}</Text>
                      <Text style={styles.textNormal}>{askInfo?.content?.info}</Text>
                    </Text>
                  </View>
                </View>
                <View style={GlobalStyles.flexRow}>
                  <View style={[GlobalStyles.mr5, styles.locationContainer]}>
                    <Icon
                      name='map-marker-alt'
                      color={BASE_COLORS.blackColor}
                      size={adjust(12)}
                      style={GlobalStyles.mr10}
                    />
                    <Paragraph title={askLocation(askInfo)} textWhite style={styles.textNormal} numberOfLines={1} />
                  </View>
                  {askInfo.endDate && !askInfo.noEndDate && (
                    <View style={styles.dateContainer}>
                      <Icon
                        name='calendar'
                        color={BASE_COLORS.blackColor}
                        size={adjust(12)}
                        style={GlobalStyles.mr10}
                      />
                      <Paragraph
                        textWhite
                        style={styles.textNormal}
                        title={`${moment(askInfo.endDate).format('MMM DD YYYY')}`}
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              GlobalStyles.flexRow,
              GlobalStyles.justifyCenter,
              GlobalStyles.ph10,
              GlobalStyles.pv10,
              styles.askInfoBlue,
            ]}>
            {currentUser?.role === CHAT_MEMBER_ROLE.ASKER && !askInfo.isEnd && (
              <Button
                title={'End Ask'}
                onPress={() => setModalEndAskVisible(true)}
                containerStyle={styles.newButtonOutline}
                textStyle={styles.textStyle}
                textWhite
              />
            )}
            <Button
              onPress={onShowParticipant}
              title={'View Responses'}
              containerStyle={styles.newButtonOutline}
              textStyle={styles.textStyle}
              textWhite
            />
            {currentUser?.role === CHAT_MEMBER_ROLE.ASKER && !askInfo.isEnd && (
              <Button
                title={'Extend Ask'}
                onPress={onModalVisibleDeadline}
                containerStyle={styles.newButtonOutline}
                textStyle={styles.textStyle}
                textWhite
              />
            )}
          </View>
        </>
      )}
      {isVisibleDeadline && (
        <ModalChangeDeadLine
          navigation={navigation}
          isVisible={isVisibleDeadline}
          isDefault={false}
          successCb={onChangeDeadLineSuccess}
          onHideModal={onModalVisibleDeadline}
        />
      )}
      {isVisibleEndAsk && (
        <ModalEndAsk
          isVisible={isVisibleEndAsk}
          isDefault={false}
          onHideModal={onEndAsk}
          onEndAskNotFoundResponder={onEndAskNotFoundResponder}
          navigation={navigation}
          onFoundResponse={onFoundResponse}
        />
      )}
    </>
  );
};

export default React.memo(ChatAskInfo);
