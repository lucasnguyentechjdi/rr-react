import { Animated, Dimensions, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import { AppRoute } from './AppRoute';
import AskFeed from './icon/AirFeed';
import { BASE_COLORS } from '~Root/config';
import Chat from './icon/Chat';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import YourAsks from './icon/YourAsks';
import Trust from './icon/Trust';
import { Text } from 'react-native-svg';
import { useTranslation } from 'react-i18next';
import { Paragraph } from '~Root/components';

const TabBar = ({ state, descriptors, navigation }: any) => {
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(0));
  const { t } = useTranslation()

  const checkActive = (label: string, appRoute: string) => {
    if (label === appRoute) {
      return true;
    }
    return false;
  };

  return (
    <View style={[styles.tabContainer, { width: '100%' }]}>
      <View style={styles.tabBarRow}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{ translateX: translateValue }],
              width: tabWidth - 20,
            },
          ]}
        />
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];

          let label;
          let iconName: string;

          if (options.tabBarLabel !== undefined) {
            label = options.tabBarLabel;
          } else {
            label = options.title !== undefined ? options.title : route.name;
          }

          switch (label) {
            case AppRoute.YOUR_ASKS:
              iconName = 'user-circle';
              break;
            case AppRoute.TRUST:
              iconName = 'shield-alt';
              break;
            case AppRoute.CHAT:
              iconName = 'comment-alt';
              break;
            case AppRoute.AIR_FEED:
              iconName = 'fire';
              break;
            default:
              iconName = 'home';
              break;
          }

          const isFocused = state.index === index;
          const onPress = () => {
            Animated.spring(translateValue, {
              toValue: index * tabWidth,
              velocity: 10,
              useNativeDriver: true,
            }).start();
            if (!isFocused) {
              navigation.navigate(route.name);
            }
          };

          // const onLongPress = () => {
          //   navigation.emit({
          //     type: 'tabLongPress',
          //     target: route.key,
          //   });
          // };

          return (
            <>
              <TouchableOpacity
                accessibilityRole='button'
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                // onLongPress={onLongPress}
                style={styles.tabArea}
                key={index}>
                {checkActive(label, AppRoute.AIR_FEED) && <AskFeed isActive={isFocused} />}
                {checkActive(label, AppRoute.YOUR_ASKS) && <YourAsks isActive={isFocused} />}
                {checkActive(label, AppRoute.CHAT) && <Chat isActive={isFocused} />}
                {checkActive(label, AppRoute.TRUST) && <Trust isActive={isFocused} />}
                {![AppRoute.AIR_FEED, AppRoute.YOUR_ASKS, AppRoute.CHAT, AppRoute.TRUST].includes(label) && (
                  <Icon
                    name={iconName}
                    size={20}
                    color={`${isFocused ? BASE_COLORS.primary : BASE_COLORS.greyColor}`}
                    style={styles.mt10}
                  />
                )}
                {checkActive(label, AppRoute.AIR_FEED) && <Paragraph title={t('air_feed')} style={{ fontSize: 12, color: !isFocused ? '#BCBCBC' : '#4683AE' }} />}
                {checkActive(label, AppRoute.YOUR_ASKS) && <Paragraph title={t('your_asks')} style={{ fontSize: 12, color: !isFocused ? '#BCBCBC' : '#4683AE' }} />}
                {checkActive(label, AppRoute.CHAT) && <Paragraph title={t('chat')} style={{ fontSize: 12, color: !isFocused ? '#BCBCBC' : '#4683AE' }} />}
                {checkActive(label, AppRoute.TRUST) && <Paragraph title={t('trust')} style={{ fontSize: 12, color: !isFocused ? '#BCBCBC' : '#4683AE' }} />}
              </TouchableOpacity>

            </>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
