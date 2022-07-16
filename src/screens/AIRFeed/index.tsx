import { BASE_COLORS, GlobalStyles } from '~Root/config';
import {
  Button,
  FeedBlockItems,
  HeaderLargeBlue,
  Icon,
  Loading,
  LoadingSecondary,
  ModalDialogMessage,
  ModalDialogRefer,
  Paragraph,
} from '~Root/components';
import {
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  ScrollViewBase,
  Share,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {adjust, buildShareLink} from '~Root/utils';
import {getFeed, setIndexAsk, setNetworkToIntroduce, setQuestion} from '~Root/services/feed/actions';
import {useDispatch, useSelector} from 'react-redux';

import { AppRoute } from '~Root/navigation/AppRoute';
import AskAPI from '~Root/services/ask/apis';
import HeaderNormalBlueNew from '~Root/components/HeaderNormalBlueNew';
import { IGlobalState } from '~Root/types';
import { IRandomDataFeed } from '~Root/services/feed/types';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import ModalDialogReport from '~Root/components/ModalDialogReport';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import UserAvatar from '~Root/components/UserAvatar';
import { askLocation } from '~Root/services/ask/actions';
import moment from 'moment';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import Flurry from 'react-native-flurry-sdk';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.AIR_FEED>;

const AIRFeedScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const feedState = useSelector((state: IGlobalState) => state.feedState);
  const userState = useSelector((state: IGlobalState) => state.userState);
  const [loading, setLoading] = useState(false);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [filter,setFilter] = useState(false)
  const [visibleModal, setVisibleModal] = useState({
    modalRefer: false,
    modalMessage: false,
  });
  const [visibleReport, setVisibleReport] = useState(false);

  const dataAsk = useMemo(() => {
    return feedState?.randomDataFeed[indexQuestion] ?? false;
  }, [feedState?.randomDataFeed, indexQuestion]);

  useEffect(() => {
    setLoading(true);
    dispatch(
      getFeed({filter: filter},() => {
        setLoading(false);
      }),
    );
  }, [filter]);

  if (loading) {
    return <LoadingSecondary />;
  }

  const onSelect = () => {
    setVisibleModal({ modalRefer: false, modalMessage: true });
  };

  const onProfile = (item: IRandomDataFeed | undefined) => {
    if (item) {
      dispatch(setQuestion(item));
      navigation.navigate(AppRoute.PROFILE_SECOND, {
        indexAsk: indexQuestion,
      });
    }
  };

  const onSkip = () => {
    if (indexQuestion === feedState.randomDataFeed.length - 1) {
      const dataAsk = feedState?.randomDataFeed[0];
      const newValue = userState.networks.filter(item => item.user?.code !== dataAsk.userCode);
      dispatch(setNetworkToIntroduce(newValue));
      setIndexQuestion(0);
      return;
    }
    const dataAsk = feedState?.randomDataFeed[indexQuestion + 1];
    const newValue = userState.networks.filter(item => item.user?.code !== dataAsk.userCode);
    dispatch(setNetworkToIntroduce(newValue));
    setIndexQuestion(indexQuestion + 1);
  };

  const onNext = () => {
    if (indexQuestion < feedState?.randomDataFeed.length - 1) {
      const dataAsk = feedState?.randomDataFeed[indexQuestion + 1];
      const newValue = userState.networks.filter(item => item.user?.code !== dataAsk.userCode);
      dispatch(setNetworkToIntroduce(newValue));
      setIndexQuestion(indexQuestion + 1);
    }
  };

  const onPrev = () => {
    if (indexQuestion - 1 >= 0) {
      const dataAsk = feedState?.randomDataFeed[indexQuestion - 1];
      const newValue = userState.networks.filter(item => item.user?.code !== dataAsk.userCode);
      dispatch(setNetworkToIntroduce(newValue));
      setIndexQuestion(indexQuestion - 1);
    }
  };

  const onVisibleMessageModal = () => {
    setVisibleModal({ ...visibleModal, modalMessage: !visibleModal.modalMessage });
  };
  const onVisibleReferModal = () => {
    setVisibleModal({ ...visibleModal, modalRefer: !visibleModal.modalRefer });
  };

  const onSelectIndividual = () => {
    dispatch(setIndexAsk(indexQuestion));
    navigation.navigate(AppRoute.INDIVIDUAL_MESSAGE_MODAL);
  };

  const onSelectJoint = () => {
    dispatch(setIndexAsk(indexQuestion));
    navigation.navigate(AppRoute.JOINT_MESSAGE_MODAL);
  };

  const askContent = () => {
    const target: string = dataAsk?.content?.target ?? '';
    const detail: string = dataAsk?.content?.detail ?? '';
    return `${target} ${detail} ${dataAsk?.content?.info ?? ''}`;
  };

  const onVisibleReport = () => {
    setVisibleReport(!visibleReport);
  };

  const onDoneReport = async (message: string) => {
    const result = await AskAPI.reportAsk(dataAsk?.code, message);
    Toast.show({
      position: 'bottom',
      type: result.success ? 'success' : 'error',
      text1: result.success ? t('send_report_success') : result.message,
      visibilityTime: 2000,
      autoHide: true,
    });
    if (result.success) {
      setVisibleReport(false);
    }
  };

  const onShare = async () => {
    if (!dataAsk) {
      Toast.show({
        position: 'bottom',
        type: 'info',
        text1: t('no_ask'),
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    const link = await buildShareLink(dataAsk);
    Flurry.logEvent('Share_Ask', {
      code: dataAsk?.code,
      link,
    });
    await Share.share({
      message: link,
    });
  };

  const onIntroduceAction = () => {
    if (!feedState.networks || feedState.networks.length < 1) {
      Toast.show({
        position: 'bottom',
        type: 'info',
        text1: t('no_introducer'),
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    setVisibleModal({ ...visibleModal, modalMessage: true });
  };

  const onCustomIntroduce = () => {
    if (!feedState.networks || feedState.networks.length < 1) {
      Toast.show({
        position: 'bottom',
        type: 'info',
        text1: t('no_introducer'),
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    if (!dataAsk) {
      Toast.show({
        position: 'bottom',
        type: 'info',
        text1: t('no_ask'),
        visibilityTime: 2000,
        autoHide: true,
      });
      return;
    }
    setVisibleModal({ ...visibleModal, modalRefer: true });
  };

  const onScrollContent = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    e.stopPropagation();
  };

  const headHeight = Dimensions.get('window').height / 2 + 75;
  const headerBlueHeight = Dimensions.get('window').height / 2 - 75;
  const headerBlueHeightNew = Dimensions.get('window').height / 2 + 75;

  if (!dataAsk) {
    <View style={GlobalStyles.containerWhite}>
      <Loading />
    </View>;
  }

  return (
    <>
      <View style={GlobalStyles.containerWhite}>
        <TouchableOpacity onPress={() => onProfile(dataAsk)}>
          <View>
            <HeaderNormalBlueNew
              isBackButton={false}
              containerHeaderStyle={{ ...GlobalStyles.ph15, height: headerBlueHeightNew }}>
              <View style={[GlobalStyles.container]}>
                {!dataAsk && (
                  <Paragraph
                    textCenter
                    h4
                    bold
                    textWhite
                    title={t('no_ask')}
                    style={[GlobalStyles.justifyCenter, GlobalStyles.alignCenter]}
                  />
                )}
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb5, GlobalStyles.alignCenter]}>
                  {dataAsk && (
                    <TouchableOpacity onPress={onPrev} style={GlobalStyles.mr15}>
                      <Icon
                        name='angle-left'
                        size={adjust(30)}
                        color={indexQuestion === 0 ? 'transparent' : BASE_COLORS.whiteColor}
                      />
                    </TouchableOpacity>
                  )}
                  {dataAsk && (
                    <TouchableOpacity style={[GlobalStyles.avatarContainer, GlobalStyles.mr20]}>
                      <View style={styles.imageProfileContainer}>
                        <UserAvatar user={dataAsk?.user} size={80} />
                      </View>
                    </TouchableOpacity>
                  )}
                  {dataAsk && (
                    <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
                      <Paragraph
                        h4
                        bold
                        textWhite
                        title={`${dataAsk?.user?.firstName ?? ''} ${dataAsk?.user?.lastName ?? ''}`}
                        style={GlobalStyles.mb5}
                      />
                      <Paragraph h5 textWhite title={dataAsk?.user?.title} style={GlobalStyles.mb5} />
                    </View>
                  )}
                  {dataAsk && (
                    <TouchableOpacity onPress={onNext} style={GlobalStyles.ml15}>
                      <Icon
                        name='angle-right'
                        size={adjust(30)}
                        color={
                          indexQuestion + 1 === feedState?.randomDataFeed.length
                            ? 'transparent'
                            : BASE_COLORS.whiteColor
                        }
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {dataAsk && (
                  <View style={[GlobalStyles.flexRow, GlobalStyles.ph23, GlobalStyles.mt10]}>
                    <View style={styles.contentContainer}>
                      <View style={[styles.tagStyleContainer, GlobalStyles.mb5]}>
                        <Paragraph
                          bold600
                          p
                          title={dataAsk?.askType?.name}
                          style={[styles.tagStyle, GlobalStyles.textUppercase]}
                        />
                      </View>
                      <ScrollView
                        onScroll={onScrollContent}
                        style={{maxHeight: Dimensions.get('window').height / 4.2 - 25}}>
                        <View onStartShouldSetResponder={() => true} style={[GlobalStyles.mb5]}>
                          <Text style={[GlobalStyles.mb5, GlobalStyles.flexRow]}>
                            <Paragraph textWhite style={styles.textBold} title={`${dataAsk?.content?.target ?? ''}`} />
                            <Paragraph
                              textWhite
                              style={styles.textNormal}
                              title={` ${dataAsk?.content?.detail ?? ''}`}
                            />
                          </Text>
                          <Text style={GlobalStyles.flexRow}>
                            <Text style={styles.textNormal}>{'For '}</Text>
                            <Text style={styles.textNormal}>{dataAsk?.content?.info}</Text>
                          </Text>
                        </View>
                      </ScrollView>
                      <View style={[GlobalStyles.flexRow]}>
                        <View style={[GlobalStyles.mr5, styles.locationContainer]}>
                          <Icon
                            name='map-marker-alt'
                            color={BASE_COLORS.blackColor}
                            size={adjust(12)}
                            style={GlobalStyles.mr10}
                          />
                          <Paragraph
                            title={askLocation(dataAsk)}
                            textWhite
                            style={styles.textNormal}
                            numberOfLines={1}
                          />
                        </View>
                        {dataAsk.endDate && !dataAsk.noEndDate && (
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
                              title={`${moment(dataAsk.endDate).format('MMM DD YYYY')}`}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </View>
                )}
                {dataAsk && (
                  <TouchableOpacity
                    onPress={() => setVisibleReport(true)}
                    style={[GlobalStyles.flexRow, styles.reportContainer]}>
                    <Icon name='flag' color={BASE_COLORS.whiteColor} size={adjust(10)} style={GlobalStyles.mr5} />
                    <Paragraph textWhite bold600 title={t('report')} style={styles.textReport} />
                  </TouchableOpacity>
                )}
                <View style={styles.btnGroup}>
                  <TouchableOpacity onPress={onIntroduceAction} style={[GlobalStyles.mr20, styles.btnCircle]}>
                    <Paragraph title={t('introduce').toUpperCase()} style={styles.btnText} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onShare} style={styles.btnCircle}>
                    <Paragraph title={t('share').toUpperCase()} style={styles.btnText} />
                  </TouchableOpacity>
                </View>
              </View>
            </HeaderNormalBlueNew>
          </View>
        </TouchableOpacity>
        <View style={[GlobalStyles.container, { marginTop: 60 }]}>
          <SafeAreaView style={[GlobalStyles.container]} edges={['right', 'left']}>
            <FeedBlockItems data={feedState.networks} onProfile={onSelect} onCustomIntroduce={onCustomIntroduce} />
          </SafeAreaView>
        </View>
        {visibleModal?.modalMessage && (
          <ModalDialogMessage
            visibleModal={visibleModal?.modalMessage}
            isDefault={false}
            onVisibleModal={onVisibleMessageModal}
            onSelectIndividual={onSelectIndividual}
            onSelectJoint={onSelectJoint}
          />
        )}
        {visibleModal?.modalRefer && (
          <ModalDialogRefer
            visibleModal={visibleModal?.modalRefer}
            isDefault={false}
            onVisibleModal={onVisibleReferModal}
            onSelect={onSelect}
          />
        )}
        {visibleReport && (
          <ModalDialogReport
            visibleModal={visibleReport}
            onVisibleModal={onVisibleReport}
            onCancel={onVisibleReport}
            onDone={onDoneReport}
            isDefault={false}
          />
        )}
      </View>
    </>
  );
};

export default React.memo(AIRFeedScreen);
