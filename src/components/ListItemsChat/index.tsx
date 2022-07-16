import React from 'react';
import {Animated, RefreshControl, View} from 'react-native';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {ListItemChat} from '~Root/components';
import {IChat} from '~Root/services/chat/types';

interface Props {
  data: any[];
  onItemClick?: (item: IChat) => void;
  changePage: () => void;
  refreshing: any;
  setRefreshing: any;
  onRefresh: any;
}
let onEndReachedCalledDuringMomentum = true;
const ListItemsChat: React.FC<Props> = ({data, onItemClick, refreshing, onRefresh, changePage}: Props) => {
  const scrollAnim = new Animated.Value(0);

  return (
    <Animated.FlatList
      contentContainerStyle={styles.listContainer}
      style={GlobalStyles.container}
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
        {useNativeDriver: true},
      )}
      showsVerticalScrollIndicator={false}
      data={data}
      key={'listItemChat'}
      keyExtractor={(item, index) => `listItemChat-${item.code}`}
      renderItem={({item}: {item: IChat}) => (
        <ListItemChat item={item} onPress={() => onItemClick?.(item)} tagStyle={styles.tagStyle} />
      )}
      onEndReached={() => {
        if (!onEndReachedCalledDuringMomentum) {
          changePage();
          onEndReachedCalledDuringMomentum = true;
        }
      }}
      onMomentumScrollBegin={() => {
        onEndReachedCalledDuringMomentum = false;
      }}
      onEndReachedThreshold={0.5}
    />
  );
};

export default ListItemsChat;
