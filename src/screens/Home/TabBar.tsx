import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { Image } from '~Root/components';

import styles from './styles';

const TabBar = ({ tabs, style, goToPage, activeTab }: any) => {
  return (
    <View style={[styles.tabs, style]}>
      {tabs.map((tab: number, i: number) => {
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => goToPage(i)}
            style={[styles.tab, activeTab === i && styles.tabActive]}>
            <Image source={tab} style={[styles.tabIcon, activeTab === i && styles.tabIconActive]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default React.memo(TabBar);
