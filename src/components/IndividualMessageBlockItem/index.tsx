import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {CheckBox, Icon, Image, InputValidateControl} from '~Root/components';
import {Text, View, ViewStyle} from 'react-native';

import React from 'react';
import {Trans} from 'react-i18next';
import {adjust} from '~Root/utils';
import {getFullName} from '~Root/services/user/actions';
import {imageUrl} from '~Root/services/upload';
import styles from './styles';

interface Props {
  profile: any;
  profileRefer: any;
  isChecked: boolean;
  onCheckboxChange: () => void;
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
  isDisable?: boolean;
}

const IndividualMessageBlockItem: React.FC<Props> = ({
  profile,
  profileRefer,
  isChecked = false,
  onCheckboxChange = () => {},
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
  isDisable = false,
}) => {
  return (
    <View style={[GlobalStyles.flexColumn, styleContainer]}>
      {isDisable && <View style={styles.disableContainer} />}
      <View style={{...GlobalStyles.flexRow, marginRight: 30}}>
        <CheckBox
          textTran={
            <Trans
              i18nKey='feed_send'
              values={{name: getFullName(profile), nameRefer: getFullName(profileRefer)}}
              parent={Text}
              components={{
                bold: <Text style={[GlobalStyles.p, GlobalStyles.textTealBlueHighlight]} />,
                color: <Text style={styles.textColor} />,
              }}
            />
          }
          isChecked={isChecked}
          onChange={onCheckboxChange}
          style={styles.checkBoxContainer}
          iconStyle={styles.iconStyle}
          textStyle={styles.textStyle}
        />
      </View>
      <View style={[GlobalStyles.flexRow, GlobalStyles.mb10, styleGroupImage]}>
        <View style={styles.imageProfileContainer}>
          {profile?.avatar ? (
            <Image source={{uri: imageUrl(profile?.avatar)}} style={styles.imageProfile} />
          ) : (
            <View style={GlobalStyles.center}>
              <Icon name='user-circle' size={65} color={BASE_COLORS.blackColor} />
            </View>
          )}
        </View>
        <Icon name='arrow-right' size={adjust(12)} color={BASE_COLORS.eerieBlackColor} style={GlobalStyles.mr10} />
        <View style={styles.imageProfileContainer}>
          {profileRefer?.avatar ? (
            <Image source={{uri: imageUrl(profileRefer?.avatar)}} style={styles.imageProfile} />
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
        placeholderTextColor={BASE_COLORS.spanishGrayColor}
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

export default IndividualMessageBlockItem;
