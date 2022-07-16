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

interface Props {
  style?: ViewStyle & TextStyle;
  styleRow?: ViewStyle & TextStyle;
  tagStyle?: TextStyle;
  onPress?: () => void;
  item: IAsk;
  showDate: boolean;
  limitLine?: boolean;
}

const ListItem: React.FC<Props> = ({
  style = {},
  styleRow = {},
  tagStyle = {},
  onPress = () => { },
  item,
  showDate = true,
  limitLine = false,
}: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={[styles.contain, style]}>
        <View style={[GlobalStyles.flexColumn, styles.itemContainer, GlobalStyles.relativeBlock]}>
          <View style={styles.contentContainer}>
            <View style={[GlobalStyles.ml20, GlobalStyles.mt15, { alignSelf: 'baseline' }]}>
              {item.endDate && !item.noEndDate && showDate && (
                <View style={{ alignSelf: 'baseline' }}>
                  <Paragraph
                    textIndianRedColor={checkHourLeft(item.endDate) || false}
                    textGray={checkHourLeft(item.endDate) || false}
                    bold
                    title={`${timeLeftFormat(item.endDate)}`}
                    style={[GlobalStyles.mb10, styles.timeTag]} />
                </View>
              )}
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
            <View style={styles.detailContent}>
              <View style={[GlobalStyles.mb15, styleRow, GlobalStyles.fullWidth, GlobalStyles.p10]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
                  <Text>
                    <Paragraph p textWhite title={'For '} style={styles.textNotoSans} />
                    <Paragraph p textWhite title={item?.content?.info} style={styles.textNotoSans} />
                  </Text>
                </View>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
                  <View style={[GlobalStyles.mr5, styles.locationContainer]}>
                    <Text style={GlobalStyles.mr5}><Location /></Text>
                    <Paragraph textWhite title={askLocation(item)} style={styles.locationText} numberOfLines={1} />
                  </View>
                  {item.endDate && !item.noEndDate && (
                    <View style={styles.dateContainer}>
                      <Text style={GlobalStyles.mr5}><Calendar /></Text>
                      <Paragraph textWhite title={`${moment(item.endDate).format('MMM DD YYYY')}`} style={styles.textNotoSans} />
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
    </TouchableOpacity >
  );
};

export default ListItem;
