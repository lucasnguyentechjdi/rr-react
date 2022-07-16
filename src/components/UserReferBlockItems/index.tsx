import {Animated, RefreshControl} from 'react-native';
import React, {useState} from 'react';

import {BASE_COLORS} from '~Root/config';
import {INetwork} from '~Root/services/network/types';
import {IUser} from '~Root/services/user/types';
import {UserReferBlockItem} from '~Root/components';
import {imageUrl} from '~Root/services/upload';
import {setUserToShare} from '~Root/services/feed/actions';
import styles from './styles';
import {useDispatch} from 'react-redux';

interface Props {
  data: any;
  onSelect: () => void;
}

const UserReferBlockItems: React.FC<Props> = ({data, onSelect}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  // const [isLazyload, setLazyload] = useState(false);
  const dispatch = useDispatch();

  const scrollAnim = new Animated.Value(0);

  const onPageChanged = () => {
    //   setLazyload(true);
  };

  const onProfile = (user: IUser) => {
    dispatch(setUserToShare(user));
    onSelect();
  };

  return (
    <Animated.FlatList
      contentContainerStyle={styles.listContainer}
      nestedScrollEnabled={true}
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
      key={'user-refer-block'}
      keyExtractor={(item, index) => `user-refer-block-${item?.userCode}-${index}`}
      renderItem={({item}: {item: INetwork}) => (
        <UserReferBlockItem
          id={item?.userCode}
          first_name={item?.user?.firstName}
          last_name={item?.user?.lastName}
          profile_photo={item?.user?.avatar}
          status={1}
          onPress={() => onProfile(item.user!)}
        />
      )}
      // ListFooterComponent={<ActivityIndicator color={BASE_COLORS.primary} />}
      onEndReached={onPageChanged}
      onEndReachedThreshold={0.5}
    />
  );
};

export default React.memo(UserReferBlockItems);
