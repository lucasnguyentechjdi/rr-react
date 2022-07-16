import React from "react";
import {View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Text} from "react-native";

import {SafeAreaView} from "react-native-safe-area-context";

import {adjust} from "~Root/utils";
import {GlobalStyles, BASE_COLORS} from "~Root/config";

import {Paragraph, ModalDialogCommon, Icon} from "..";
import {TPickerSource, TPickerValue} from "./type";
import styles from "./styles";

type OwnProps = {
  placeholder?: string;
  title?: string;
  value?: TPickerValue;
  source?: TPickerSource[];
  onChange?: (value: TPickerValue) => void;
}

const Picker: React.FC<OwnProps> = ({placeholder, title, value, source, onChange}) => {
  const [ showPicker, setShowPicker ] = React.useState<boolean>(false);

  const offsetKeyboard = Platform.select({
    ios: 0,
    android: adjust(20),
  });

  const onChangeDropDown = (value: TPickerValue) => {
    setShowPicker(false);

    if (onChange) {
      onChange(value)
    }
  };

  return (
    <View>
      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView style={GlobalStyles.container}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mh15, GlobalStyles.mb65]}>
              <Paragraph h5 textBlack title={title} style={[GlobalStyles.mv15, styles.title]} />
              <TouchableOpacity
                onPress={() => setShowPicker(true)}
                style={[styles.pickerContainer, GlobalStyles.mb15]}>
                <View style={styles.picker}>
                  <Text style={styles.pickerText}>{value || placeholder}</Text>
                  <Icon name='angle-down' size={adjust(10)} color={BASE_COLORS.blackColor} />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {showPicker && (
        <ModalDialogCommon
          isVisible={showPicker}
          onHideModal={() => setShowPicker(false)}
          isDefault={false}
          styleModal={styles.styleModal}
          styleModalContainer={styles.styleModalContainer}>
          <View style={styles.optionList}>
            {(source || []).map((item: TPickerSource, index) => (
                  <TouchableOpacity key={index} onPress={() => onChangeDropDown(item.value)}>
                    <View style={styles.optionItem}>
                      <Paragraph h5 title={item.title} style={styles.optionTitle} />
                    </View>
                  </TouchableOpacity>
            ))}
          </View>
        </ModalDialogCommon>
      )}
    </View>
  )
}

export default Picker;
