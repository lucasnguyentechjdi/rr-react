import { BASE_COLORS, GlobalStyles } from '~Root/config';
import {
  FeedBlockItems,
  Icon,
  Loading,
  LoadingSecondary,
  ModalDialogMessage,
  ModalDialogRefer,
  Paragraph,
} from '~Root/components';
import { Dimensions, NativeScrollEvent, NativeSyntheticEvent, Share, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { adjust, buildShareLink } from '~Root/utils';
import { getFeed, setIndexAsk, setNetworkToIntroduce, setQuestion } from '~Root/services/feed/actions';
import { useDispatch, useSelector } from 'react-redux';

import { AppRoute } from '~Root/navigation/AppRoute';
import AskAPI from '~Root/services/ask/apis';
import { IGlobalState } from '~Root/types';
import { IRandomDataFeed } from '~Root/services/feed/types';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import ModalDialogReport from '~Root/components/ModalDialogReport';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import Flurry from 'react-native-flurry-sdk';
import ShareIcon from './icon/share';
import AirFeedItem from '~Root/components/ListItem/airFeedItem';
import { NextIcon, PrevIcon } from './icon/nav';
import ModalDialogFilter from '~Root/components/ModalDialogFilter';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.AIR_FEED>;

const AIRFeedScreen: React.FC<Props> = ({ navigation }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const feedState = useSelector((state: IGlobalState) => state.feedState);
  const userState = useSelector((state: IGlobalState) => state.userState);
  const [loading, setLoading] = useState(false);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [filter, setFilter] = useState('');
  const [from, setFrom] = useState('');
  const [visibleModal, setVisibleModal] = useState({
    modalRefer: false,
    modalMessage: false,
  });
  const [showFilter, setShowFilter] = useState(false);
  const [visibleReport, setVisibleReport] = useState(false);

  const dataAsk = useMemo(() => {
    return feedState?.randomDataFeed[indexQuestion] ?? false;
  }, [feedState?.randomDataFeed, indexQuestion]);

  useEffect(() => {
    setShowFilter(false);
    setLoading(true);
    dispatch(
      getFeed({ filter, from }, () => {
        setLoading(false);
      }),
    );
  }, []);

  const onApplyFilter = () => {
    setShowFilter(false);
    setLoading(true);
    dispatch(
      getFeed({ filter, from }, () => {
        setLoading(false);
      }),
    );
  };

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

  const headerBlueHeightNew = Dimensions.get('window').height / 2;

  if (!dataAsk) {
    <View style={GlobalStyles.containerWhite}>
      <Loading />
    </View>;
  }

  return (
    <>
      <View style={GlobalStyles.containerGray}>
        <View style={styles.filterRow}>
          <View style={styles.filterGroup}>
            <Paragraph title={t('Filter by: ')} style={styles.filterText} />
            <TouchableOpacity onPress={() => setShowFilter(true)} style={[styles.reportButton]}>
              <Paragraph bold600 title={t('+ Filter')} style={styles.textBtnFilter} />
              {(filter !== '' || from !== '') && <View style={styles.filterPoint} />}
            </TouchableOpacity>
          </View>
          <View style={styles.reportGroup}>
            {dataAsk && (
              <TouchableOpacity onPress={() => setVisibleReport(true)}>
                <Icon name='flag' color={BASE_COLORS.blackColor} size={adjust(20)} style={GlobalStyles.mr5} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View>
          <View style={{ height: headerBlueHeightNew }}>
            <View style={styles.backgroundHeaderWhite} />
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
              <TouchableOpacity onPress={() => onProfile(dataAsk)}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb5, GlobalStyles.alignCenter]}>
                  {dataAsk && (
                    <TouchableOpacity onPress={onPrev} style={styles.prevSide}>
                      <View style={styles.prevSideTop} />
                      <View style={styles.prevIcon}>{indexQuestion !== 0 && <PrevIcon />}</View>
                    </TouchableOpacity>
                  )}
                  {dataAsk && (
                    <AirFeedItem
                      showDate={true}
                      item={dataAsk}
                      onPress={() => onProfile(dataAsk)}
                      tagStyle={GlobalStyles.askTagStyle}
                      limitLine={true}
                    />
                  )}
                  {dataAsk && (
                    <TouchableOpacity onPress={onNext} style={styles.nextSide}>
                      <View style={styles.nextSideTop} />
                      <View style={styles.nextIcon}>
                        {indexQuestion + 1 !== feedState?.randomDataFeed.length && <NextIcon />}
                      </View>
                    </TouchableOpacity>
                  )}
                </View>
              </TouchableOpacity>
              <View style={styles.btnGroup}>
                <TouchableOpacity onPress={onIntroduceAction} style={[GlobalStyles.mr20, styles.btnIntroduce]}>
                  <Paragraph title={t('Introduce')} style={styles.btnText} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onShare} style={styles.btnCircle}>
                  <ShareIcon />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={[GlobalStyles.container]}>
          <SafeAreaView style={[GlobalStyles.container]} edges={['right', 'left']}>
            <FeedBlockItems data={feedState.networks} onProfile={onSelect} onCustomIntroduce={onCustomIntroduce} />
          </SafeAreaView>
        </View>
        {showFilter && (
          <ModalDialogFilter
            filter={filter}
            setFilter={setFilter}
            from={from}
            setFrom={setFrom}
            visibleModal={showFilter}
            isDefault={false}
            onVisibleModal={() => setShowFilter(false)}
            onApplyFilter={onApplyFilter}
          />
        )}
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
