import React, { useLayoutEffect, useState } from 'react';
import { Animated, RefreshControl } from 'react-native';

import { BASE_COLORS } from '~Root/config';
import { BlockItem } from '~Root/components';
import styles from './styles';
import { IInvite } from '~Root/services/invite/types';
import { imageUrl } from '~Root/services/upload';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInviteData, getUserNetworkData } from '~Root/services/user/actions';
import { IChat } from '~Root/services/chat/types';
import { IUser } from '~Root/services/user/types';
import { IGlobalState } from '~Root/types';
interface Props {
  data: any[];
  isVisible: boolean;
  isSuggest?: boolean;
  onConfirm: (item: IInvite) => void;
  onPending: (item: IInvite) => void;
  onItemClick: (item: IInvite) => void;
  onChat: (item: IChat) => void;
  handleSuggestConnection?: (payload: { isAccepted: boolean }) => void;
  showModalRejectSuggestion?: () => void;
}

const BlockItems: React.FC<Props> = ({
  data,
  isVisible = false,
  isSuggest = false,
  onConfirm = () => { },
  onPending = () => { },
  onChat = () => { },
  onItemClick = () => { },
  handleSuggestConnection = () => { },
  showModalRejectSuggestion = () => { },
}: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const userState = useSelector((state: IGlobalState) => state.userState);
  const dispatch = useDispatch();
  // const [isLazyload, setLazyload] = useState(false);

  const scrollAnim = new Animated.Value(0);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getUserInviteData());
    dispatch(getUserNetworkData(userState.userInfo?.isSuggest));
    setRefreshing(false);
  };

  const onPageChanged = () => { };

  const getName = (item: IInvite) => {
    if (item.user) {
      return `${item.user?.firstName} ${item.user?.lastName}`;
    }
    if (item.name) {
      return item.name;
    }
    return '';
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
        { useNativeDriver: true },
      )}
      showsVerticalScrollIndicator={false}
      data={data}
      key={'block'}
      keyExtractor={(item, index) => `block-${item.code}-${index}`}
      renderItem={({ item, index }: { item: IInvite | any, index: number }) =>
        <BlockItem
          id={item?.code}
          name={getName(item)}
          myself={false}
          profile_photo={item?.user?.avatar ? imageUrl(item?.user?.avatar) : null}
          status={item?.status}
          phoneNumber={item.phoneNumber ?? ''}
          countryCode={item.countryCode ?? ''}
          user={item.user}
          onPress={() => onItemClick(item)}
          showConfirm={isVisible}
          onConfirm={() => onConfirm(item)}
          onPending={() => onPending(item)}
          onAddSuggest={() => handleSuggestConnection({ isAccepted: true })}
          onRejectSuggest={() => showModalRejectSuggestion()}
          onChat={onChat}
          isSuggest={isSuggest && index === 0}
        />
      }
      onEndReached={onPageChanged}
      onEndReachedThreshold={0.5}
    />
  );
};

export default React.memo(BlockItems);
