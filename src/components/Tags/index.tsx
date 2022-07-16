import React, {useState} from 'react';
import {Animated, RefreshControl} from 'react-native';

import {ITags} from '~Root/services/user/types';
import {BASE_COLORS} from '~Root/config';
import {Button} from '~Root/components';
import styles from './styles';

interface Props {
  data: ITags[];
  selected?: ITags;
  onPress: (item: ITags) => void;
}

const Tags = ({data, selected, onPress}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const scrollAnim = new Animated.Value(0);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const onPageChanged = () => {
    //   setLazyload(true);
  };

  return (
    <Animated.FlatList
      horizontal
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
        {useNativeDriver: true},
      )}
      showsVerticalScrollIndicator={false}
      data={data}
      key={'tags'}
      keyExtractor={(item, index) => `tags-${index}`}
      renderItem={({item}: {item: ITags}) => (
        <Button
          title={item.name}
          onPress={() => onPress(item)}
          containerStyle={item.id === selected?.id ? styles.buttonContainerActiveStyle : styles.buttonContainerStyle}
          textStyle={item.id === selected?.id ? styles.buttonTextActiveStyle : styles.buttonTextStyle}
        />
      )}
      onEndReached={onPageChanged}
      onEndReachedThreshold={0.5}
    />
  );
};

export default Tags;
