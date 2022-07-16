import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { Icon, Paragraph } from '~Root/components';
import { Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { adjust } from '~Root/utils';

import { IAsk } from '~Root/services/ask/types';
import React from 'react';
import { askLocation } from '~Root/services/ask/actions';
import moment from 'moment';
import styles from './styles';
import { checkHourLeft, timeLeftFormat } from '~Root/utils/functions';
import Calendar from './icon/Calendar';
import Location from './icon/Location';
import UserAvatar from '../UserAvatar';

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyle?: TextStyle;
  onPress?: () => void;
  item: IAsk;
  showDate: boolean;
  limitLine?: boolean;
}

const AirFeedItem: React.FC<Props> = ({
  style = {},
  styleRow = {},
  tagStyle = {},
  onPress = () => {},
  item,
  showDate = true,
  limitLine = false,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.askContain, style]}>
        <View style={[GlobalStyles.relativeBlock]}>
          <View style={styles.askAirFeedBlock}>
            <View style={[styles.askTitleBlock]}>
              <View style={GlobalStyles.fullWidth}>
                <View style={styles.profileContainer}>
                  <View style={styles.imageProfileContainer}>
                    <UserAvatar user={item.user} size={40} iconColor={BASE_COLORS.blackColor} />
                  </View>
                  <View style={styles.groupText}>
                    <Paragraph
                      h5
                      bold
                      title={`${item?.user?.firstName ?? ''} ${item?.user?.lastName ?? ''}`}
                      style={styles.boldTitle}
                    />
                    <Paragraph p numberOfLines={2} title={item.user?.title} style={styles.title} />
                  </View>
                </View>
              </View>
              <View style={GlobalStyles.fullWidth}>
                <Paragraph p textBlack title={item?.askType?.name} style={GlobalStyles.mb10} />
                <Paragraph
                  h5
                  bold
                  textBlack
                  title={item?.content?.target + ', ' + item?.content?.detail}
                  numberOfLines={1}
                  style={GlobalStyles.mb10}
                />
              </View>
            </View>
            <View style={styles.askDetailContent}>
              <View style={[GlobalStyles.mb15, styleRow, GlobalStyles.fullWidth, GlobalStyles.p10]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
                  <Text>
                    <Paragraph p textWhite title={'For '} style={styles.textNotoSans} />
                    <Paragraph p textWhite title={item?.content?.info} style={styles.textNotoSans} />
                  </Text>
                </View>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
                  <View style={[GlobalStyles.mr5, styles.locationContainer]}>
                    <Text style={GlobalStyles.mr5}>
                      <Location />
                    </Text>
                    <Paragraph textWhite title={askLocation(item)} style={styles.locationText} numberOfLines={1} />
                  </View>
                  {item.endDate && !item.noEndDate && (
                    <View style={styles.dateContainer}>
                      <Text style={GlobalStyles.mr5}>
                        <Calendar />
                      </Text>
                      <Paragraph
                        textWhite
                        title={`${moment(item.endDate).format('MMM DD YYYY')}`}
                        style={styles.textNotoSans}
                      />
                    </View>
                  )}
                </View>
                <Paragraph
                  p
                  textWhite
                  title={item?.additionalInformation || ''}
                  style={styles.textNotoSans}
                  numberOfLines={limitLine ? 5 : 0}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AirFeedItem;
