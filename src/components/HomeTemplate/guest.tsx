/* eslint-disable @typescript-eslint/restrict-template-expressions */

import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { HeaderNormalBlue, Icon, Image, Paragraph } from '~Root/components';
import { ScrollView, TouchableOpacity, View, ViewStyle } from 'react-native';

import { IUser } from '~Root/services/user/types';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { adjust } from '~Root/utils';
import styles from './styles';
import { imageUrl } from '~Root/services/upload';
import UserAvatar from '../UserAvatar';

interface Props {
  containerHeaderStyle?: ViewStyle;
  profile?: IUser | null;
  children?: React.ReactNode;
  navigation?: any;
}

const GuestHomeTemplateScreen: React.FC<Props> = ({ containerHeaderStyle = {}, profile, children }: Props) => {
  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderNormalBlue onBack={() => { }} isBackButton={false} containerHeaderStyle={containerHeaderStyle}>
        <View style={styles.headerContent}>
          <View style={[GlobalStyles.flexRow, styles.headerWrapper]}>
            <View style={GlobalStyles.flexRow}>
              <TouchableOpacity style={[GlobalStyles.avatarContainer, { flex: 4 }]}>
                <UserAvatar user={profile} size={60} imageSize={80} />
              </TouchableOpacity>
              <View style={[GlobalStyles.flexColumn, styles.userInfoWidth]}>
                <Paragraph
                  p
                  bold600
                  textWhite
                  numberOfLines={2}
                  title={profile?.title}
                  style={[GlobalStyles.mb10, styles.limitWidth, styles.title, styles.biztype]}
                />
                {profile?.title && profile?.title !== '' && (
                  <Paragraph
                    p
                    textWhite
                    title={profile?.title}
                    style={[GlobalStyles.mb20, styles.limitWidth, styles.title, styles.biztype]}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </HeaderNormalBlue>

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <ScrollView
          style={[GlobalStyles.scrollViewWhite, styles.scrollViewWhite]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.scrollViewContentContainer}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default GuestHomeTemplateScreen;
