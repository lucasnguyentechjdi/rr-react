import React, {useState} from 'react';
import {Animated, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {IAuthState} from '~Root/services/auth/types';
import {BASE_COLORS} from '~Root/config';
import styles from './styles';
import {InviteContactItem} from '~Root/components';
import {IGlobalState} from '~Root/types';
import {IInvite} from '~Root/services/invite/types';
import {getUserInviteData} from '~Root/services/user/actions';

interface Props {
  data: IInvite[];
  onItemClick?: (item: any) => void;
}

const InviteContactItems: React.FC<Props> = ({data, onItemClick}: Props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const authState: IAuthState = useSelector((state: IGlobalState) => state.authState);

  const scrollAnim = new Animated.Value(0);

  const onRefresh = () => {
    if (authState?.isLoggedIn) {
      setRefreshing(true);
      dispatch(getUserInviteData());
      setRefreshing(false);
    }
  };

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
        {useNativeDriver: true},
      )}
      showsVerticalScrollIndicator={false}
      data={data}
      key={'inviteContactList'}
      keyExtractor={(item, index) => `listItem-${index}`}
      renderItem={({item, index}: {item: any; index: number}) => (
        <InviteContactItem index={index} item={item} onPress={() => onItemClick?.(item)} />
      )}
      onEndReachedThreshold={0.5}
    />
  );
};

export default InviteContactItems;
