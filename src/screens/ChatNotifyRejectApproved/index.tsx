import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Icon, Image, Paragraph} from '~Root/components';
import React, {useMemo} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {Trans, useTranslation} from 'react-i18next';

import {SafeAreaView} from 'react-native-safe-area-context';
import {adjust} from '~Root/utils';
import moment from 'moment';
import styles from './styles';

interface Props {
  approved?: boolean;
  responder?: boolean;
}
const ChatNotifyRejectApproved = ({approved, responder}: Props) => {
  const {t} = useTranslation();
  const contentHeaderInfo = useMemo(() => {
    return {
      bgColor: approved ? BASE_COLORS.oxleyColor : BASE_COLORS.indianRedColor,
      text: approved ? t('accepted') : t('rejected'),
    };
  }, [approved]);

  const contentForAsk = useMemo(() => {
    return (
      <>
        <Paragraph
          p
          bold
          textCenter
          title='Looking for Clients For Marketing Solutions.'
          style={[{marginTop: adjust(18)}]}
        />
        <TouchableOpacity style={styles.buttonViewProfile}>
          <Paragraph bold textWhite h5 title={t('view_profile')} />
        </TouchableOpacity>
      </>
    );
  }, []);

  const contentForResponder = useMemo(() => {
    return (
      <>
        <Paragraph
          p
          bold
          textCenter
          title='SEEKING RECOMMENDATIONS'
          style={[{marginTop: adjust(6)}, styles.seekingRecommend]}
        />
        <View style={[GlobalStyles.mt15, {width: '100%'}]}>
          <Paragraph h5 bold title='Marketing expert' />
          <View style={GlobalStyles.flexRow}>
            <Trans
              i18nKey='ask_content_preview'
              values={{content: 'new cafe, Ola'}}
              parent={Text}
              components={{
                normal: <Text style={GlobalStyles.textNormal} />,
                highlight: <Text style={GlobalStyles.textNormal} />,
              }}
            />
          </View>
        </View>
        <View style={[GlobalStyles.flexRow, GlobalStyles.mt5]}>
          <View style={[GlobalStyles.mr5, styles.locationContainer]}>
            <Icon name='map-marker-alt' color={BASE_COLORS.blackColor} size={adjust(12)} style={GlobalStyles.mr10} />
            <Paragraph textTealBlue title='Singapore' style={styles.locationText} numberOfLines={1} />
          </View>
          <View style={styles.dateContainer}>
            <Icon name='calendar' color={BASE_COLORS.blackColor} size={adjust(12)} style={GlobalStyles.mr10} />
            <Paragraph textTealBlue title={`${moment().format('MMM DD YYYY')}`} />
          </View>
        </View>
        <TouchableOpacity style={styles.buttonViewProfile}>
          <Paragraph bold textWhite h5 title={t('view_full_ask')} />
        </TouchableOpacity>
      </>
    );
  }, []);

  return (
    <View style={GlobalStyles.containerWhite}>
      <SafeAreaView style={[GlobalStyles.container]} edges={['right', 'left']}>
        <View style={styles.header}>
          <Paragraph h4 bold600 title={t('notifications')} />
        </View>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <TouchableOpacity style={[GlobalStyles.flexRow, styles.btnBack]}>
            <Icon name='angle-left' size={adjust(15)} color={BASE_COLORS.blackColor} style={GlobalStyles.mr10} />
            <Paragraph bold600 title={t('back_to_chat')} />
          </TouchableOpacity>
          <View style={styles.containerInfo}>
            <View style={[styles.headerInfo, {backgroundColor: contentHeaderInfo.bgColor}]}>
              <Icon name='circle' size={adjust(20)} color={BASE_COLORS.whiteColor} style={GlobalStyles.mr10} />
              <Paragraph bold textWhite h4 title={contentHeaderInfo.text} />
            </View>
            <Paragraph h5 bold title={t('has_introduced')} textCenter style={[{marginTop: adjust(15)}]} />

            <Image
              source={{
                uri: 'https://picsum.photos/200/300',
              }}
              style={[styles.imageProfile]}
            />

            <Paragraph h3 bold title='RYAN DECKER' style={[{marginTop: adjust(18)}]} />
            {contentForResponder}
            <Paragraph h5 bold title={t('note_from_introducer')} style={[{marginTop: adjust(29)}]} />
            <Paragraph
              style={[{marginTop: adjust(29)}]}
              bold
              h4
              textCenter
              title='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pulvinar congue egestas feugiat et amet nulla venenatis massa.'
            />

            <Icon name='angle-up' size={adjust(15)} color={BASE_COLORS.whiteColor} style={styles.icon} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ChatNotifyRejectApproved;
