import { Animated, RefreshControl, View } from 'react-native';
import { BASE_COLORS, GlobalStyles } from '~Root/config';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IAsk } from '~Root/services/ask/types';
import { IGlobalState } from '~Root/types';
import { ListItem } from '~Root/components';
import { getUserAskData } from '~Root/services/user/actions';
import styles from './styles';

interface Props {
  data: IAsk[];
  onItemClick?: (item: IAsk) => void;
}

const ListItems: React.FC<Props> = ({ data, onItemClick }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const authState = useSelector((state: IGlobalState) => state.authState);
  const userState = useSelector((state: IGlobalState) => state.userState);
  const dispatch = useDispatch();
  const scrollAnim = new Animated.Value(0);

  const onRefresh = () => {
    if (authState?.isLoggedIn) {
      setRefreshing(true);
      const page = userState?.askPagination?.pageCurrent ?? 1;
      const limit = userState?.askPagination?.recordPerPage ?? 50;
      dispatch(getUserAskData(page, limit));
      setRefreshing(false);
    }
  };

  const getDataNextPage = () => {
    setRefreshing(true);
    const page = userState?.askPagination?.pageCurrent;
    const limit = userState?.askPagination?.recordPerPage;
    const total = userState?.askPagination?.recordTotal;
    if (page * limit >= total) {
      setRefreshing(false);
      return;
    }
    dispatch(getUserAskData(page, limit, true));
    setRefreshing(false);
  };

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.FlatList
      contentContainerStyle={styles.listContainer}
      nestedScrollEnabled={true}
      refreshControl={
        <RefreshControl
          colors={[BASE_COLORS.primary]}
          tintColor={BASE_COLORS.primary}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
      scrollEventThrottle={1}
      onScroll={Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                y: scrollAnim,
              },
            },
          },
        ],
        { useNativeDriver: true },
      )}
      showsVerticalScrollIndicator={false}
      data={data}
      key={'listItem'}
      keyExtractor={(item: IAsk) => `listItem-${item.code}`}
      renderItem={({ item }: { item: IAsk }) => (
        <ListItem
          showDate={true}
          item={item}
          onPress={() => onItemClick?.(item)}
          tagStyle={GlobalStyles.askTagStyle}
          limitLine={true}
        />
      )}
      onEndReachedThreshold={0.5}
      onEndReached={getDataNextPage}
    />
  );
};

export default React.memo(ListItems);
