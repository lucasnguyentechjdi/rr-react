import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Icon, InputValidateControl, Paragraph} from '~Root/components';
import {TouchableOpacity, View, ViewStyle} from 'react-native';

import {IUserIntroducer} from '~Root/screens/FeedBackModal';
import {Picker} from '@react-native-picker/picker';
import React from 'react';
import {adjust} from '~Root/utils';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import UserAvatar from '../UserAvatar';
import {getFullName} from '~Root/services/user/actions';
import ModalDialogCommon from '../ModalDialogCommon';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  data: IUserIntroducer[];
  dataSelected?: any;
  tags?: any[];
  onChangeDropDown?: (itemValue: string) => void;
  name: string;
  isValid: boolean;
  errors: any;
  control: any;
  register: any;
  autoFocus?: boolean;
  multiline?: boolean;
  allowSelect?: boolean;
  numberOfLines?: number;
  onAddTag?: () => void;
  styleContainer?: ViewStyle;
}

const FeedBackBlockItem = ({
  data = [],
  dataSelected = false,
  tags = [],
  onChangeDropDown = () => {},
  name,
  isValid,
  errors,
  control,
  register,
  autoFocus = false,
  multiline = true,
  allowSelect = true,
  numberOfLines = 4,
  onAddTag = () => {},
  styleContainer = {},
  title,
}: Props) => {
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const onHideModal = () => {
    setIsOpen(false);
  };

  const onChangePicker = (item: any) => {
    onChangeDropDown(item);
    setIsOpen(false);
  };

  return (
    <>
      <View style={[GlobalStyles.container, styleContainer]}>
        <View style={[styles.pickerContainer, GlobalStyles.mb15]}>
          <TouchableOpacity onPress={() => (allowSelect ? setIsOpen(true) : null)}>
            <View style={styles.picker}>
              {dataSelected && (
                <View style={styles.userItem}>
                  <UserAvatar size={adjust(20)} user={dataSelected} imageSize={30} />
                  <Paragraph h5 title={getFullName(dataSelected)} style={styles.userTitle} />
                </View>
              )}
              {!dataSelected && <View><Paragraph h5 title={title} style={[styles.userTitle, GlobalStyles.ml5]} /></View>}
              <Icon name='chevron-down' size={adjust(15)} color={BASE_COLORS.blackColor} />
            </View>
          </TouchableOpacity>
        </View>
        <View style={[GlobalStyles.flexColumn, styles.tagContainer]}>
          {tags?.length > 0 && (
            <View style={styles.tagArea}>
              {tags.map((item, index) => (
                <Paragraph textEerieBlackColor title={item} key={`responder-tags-${index}`} style={styles.tag} />
              ))}
            </View>
          )}
          <View style={styles.btnAddContainer}>
            <TouchableOpacity onPress={onAddTag} style={styles.btnAdd}>
              <Icon name='plus' size={adjust(10)} color={BASE_COLORS.primary} style={GlobalStyles.mr10} />
              <Paragraph p textPrimary title={`Add New Tag`} style={styles.textBtnAdd} />
            </TouchableOpacity>
          </View>
          <Paragraph textSpanishGrayColor italic title='Private to you' style={styles.alignEnd} />
        </View>
        <InputValidateControl
          placeholder={t('your_feedback')}
          placeholderTextColor={BASE_COLORS.lightPinkColor}
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
        />
      </View>
      <ModalDialogCommon
        isVisible={isOpen}
        onHideModal={onHideModal}
        isDefault={false}
        styleModal={styles.styleModal}
        styleModalContainer={styles.styleModalContainer}>
        <View style={styles.userList}>
          <ScrollView>
            {data?.map((item: IUserIntroducer) => (
              <TouchableOpacity onPress={() => onChangePicker(item)}>
                <View style={styles.userItem}>
                  <UserAvatar size={adjust(30)} user={item} imageSize={45} />
                  <Paragraph h5 title={getFullName(item)} style={styles.userTitle} />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ModalDialogCommon>
    </>
  );
};

export default FeedBackBlockItem;
