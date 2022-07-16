import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Icon, Image, InputValidateControl} from '~Root/components';
import {Text, View, ViewStyle} from 'react-native';

import {IUser} from '~Root/services/user/types';
import React from 'react';
import {Trans} from 'react-i18next';
import {adjust} from '~Root/utils';
import {getFullName} from '~Root/services/user/actions';
import {imageUrl} from '~Root/services/upload';
import styles from './styles';

interface Props {
  profile: IUser | undefined;
  profileJoint: Partial<IUser> | undefined;
  name: string;
  isValid: boolean;
  errors: any;
  control: any;
  register: any;
  autoFocus?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  styleContainer?: ViewStyle;
  styleGroupImage?: ViewStyle;
}

const IndividualJointBlockItem: React.FC<Props> = ({
  profile,
  profileJoint,
  name,
  isValid,
  errors,
  control,
  register,
  autoFocus = false,
  multiline = true,
  numberOfLines = 4,
  styleContainer = {},
  styleGroupImage = {},
}) => {
  return (
    <View style={[GlobalStyles.flexColumn, styleContainer]}>
      <View style={GlobalStyles.mb15}>
        <Trans
          i18nKey='feed_joint'
          values={{name: getFullName(profile), nameJoint: getFullName(profileJoint)}}
          parent={Text}
          components={{
            bold: <Text style={[GlobalStyles.p, GlobalStyles.textTealBlueHighlight]} />,
            color: <Text style={styles.textColor} />,
          }}
        />
      </View>
      <View style={[GlobalStyles.flexRow, GlobalStyles.mb10, styleGroupImage]}>
        <View style={{...styles.imageProfileContainer, marginRight: 25}}>
          {profile?.avatar ? (
            <Image source={{uri: imageUrl(profile?.avatar)}} style={styles.imageProfile} />
          ) : (
            <View style={GlobalStyles.center}>
              <Icon name='user-circle' size={65} color={BASE_COLORS.blackColor} />
            </View>
          )}
        </View>
        <View style={{marginRight: adjust(6)}}>
          <Icon name='arrow-right' size={adjust(12)} color={BASE_COLORS.eerieBlackColor} style={GlobalStyles.mr10} />
        </View>
        <View style={styles.imageProfileContainer}>
          {profileJoint?.avatar ? (
            <Image source={{uri: imageUrl(profileJoint?.avatar)}} style={styles.imageProfile} />
          ) : (
            <View style={GlobalStyles.center}>
              <Icon name='user-circle' size={65} color={BASE_COLORS.blackColor} />
            </View>
          )}
        </View>
      </View>
      <InputValidateControl
        styleContainer={styles.styleContainer}
        inputStyle={styles.inputBorderStyle}
        labelStyle={styles.labelStyle}
        inputErrorStyle={!isValid && styles.inputErrorStyle}
        selectionColor={BASE_COLORS.primary}
        errors={errors}
        control={control}
        name={name}
        register={register}
        autoFocus={autoFocus}
        multiline={multiline}
        numberOfLines={numberOfLines}
        placeholder='I think both of you would make a great connection!'
      />
    </View>
  );
};

export default IndividualJointBlockItem;
