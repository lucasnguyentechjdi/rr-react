import {
  Animated,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { Button, FeedBlockItem, Icon } from '~Root/components';
import React, { useEffect, useRef, useState } from 'react';

import { INetwork } from '~Root/services/network/types';
import Paragraph from '../Paragraph';
import { adjust } from '~Root/utils';
import { imageUrl } from '~Root/services/upload';
import { setUserToShare } from '~Root/services/feed/actions';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Swiper from 'react-native-swiper';
import CustomIcon from './customIcon';

interface Props {
  data: INetwork[];
  onProfile: () => void;
  onCustomIntroduce: () => void;
}

const FeedBlockItems: React.FC<Props> = ({ data, onProfile = () => {}, onCustomIntroduce = () => {} }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [items, setItems] = useState<Element[]>([]);
  const paginationItem = [];
  const [currentPage, setPage] = useState(0);
  const flatListRef = useRef<any>(null);
  const headHeight = Dimensions.get('window').height / 2 - 100;

  const stylesNew = StyleSheet.create({
    bottomSwiper: {
      ...GlobalStyles.flexRow,
      paddingLeft: 20,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      overflow: 'hidden',
    },
    customBackground: {
      position: 'absolute',
      right: 0,
      top: 0,
    },
    wrapper: {},
    slide1: {
      height: headHeight,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      paddingTop: 30,
    },
    slide2: {
      backgroundColor: BASE_COLORS.whiteColor,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
      height: headHeight,
      padding: 10,
      paddingLeft: 25,
      paddingRight: 25,
      paddingTop: 30,
    },
    slide3: {
      height: headHeight,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: '#fff',
      fontSize: 30,
      fontWeight: 'bold',
    },
  });

  const onIndexChanged = (index: number) => {
    if (!data[index] || !data[index].user) return;
    if (data[index]?.user) {
      dispatch(setUserToShare(data[index].user));
    }
    setPage(index);
  };

  const onPressItem = (item: INetwork) => {
    if (!item.user) return;
    dispatch(setUserToShare(item.user));
    onProfile();
  };

  const renderList = () => {
    const items = [];
    data.forEach((item: any) => {
      items.push(
        <FeedBlockItem
          key={item?.userCode}
          style={stylesNew.slide1}
          id={item?.userCode}
          first_name={item?.user?.firstName}
          last_name={item?.user?.lastName}
          myself={{
            biztype: item?.user?.title ?? '',
            self_intro: item?.user?.introduction ?? '',
            industry: item?.user?.sellToIndustries ?? [],
          }}
          profile_photo={item?.user?.avatar ? imageUrl(item?.user?.avatar) : null}
          status={1}
          onPress={() => onPressItem(item)}
        />,
      );
    });
    items.push(
      <View key={'custom'} style={stylesNew.slide2}>
        <View style={stylesNew.customBackground}>
          <CustomIcon />
        </View>
        <View style={[GlobalStyles.mb20]}>
          <Paragraph bold600 title={t('Have someone')} />
          <Paragraph bold600 title={t('else in mind?')} />
          <Paragraph
            title={t('Make a custom introduction to someone else from your Trust Network.')}
            style={GlobalStyles.mt10}
          />
        </View>
        <Button
          bordered
          title={t('custom_introduction')}
          onPress={onCustomIntroduce}
          containerStyle={GlobalStyles.mainButtonArea}
          textStyle={{ ...GlobalStyles.mainButtonTextStyle, ...GlobalStyles.h5, ...styles.textStyle }}
          textWhite
        />
      </View>,
    );
    setItems(items);
  };

  const onPagination = (page: number) => {
    onIndexChanged(page);
    if (flatListRef?.current) {
      flatListRef.current?.scrollTo(page);
    }
  };

  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      paginationItem.push(
        <TouchableOpacity key={`pagination-${i}`} onPress={() => onPagination(i)}>
          <Text style={i === currentPage ? styles.circleActive : styles.circle} />
        </TouchableOpacity>,
      );
    }
  }

  useEffect(() => {
    renderList();
    if (data.length > 0 && data[0]?.user) {
      dispatch(setUserToShare(data[0]?.user));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <View style={stylesNew.bottomSwiper}>
      <Swiper
        ref={flatListRef}
        loop={false}
        height={headHeight}
        index={0}
        showsPagination={false}
        onIndexChanged={onIndexChanged}
        showsButtons={false}
        style={stylesNew.wrapper}
        horizontal={false}>
        {items}
      </Swiper>
      {data.length > 0 && <View style={[GlobalStyles.flexColumn, GlobalStyles.mr10]}>{paginationItem}</View>}
    </View>
  );
};

export default FeedBlockItems;
