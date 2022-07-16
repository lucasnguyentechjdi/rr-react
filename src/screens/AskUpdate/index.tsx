import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {HeaderSmallBlue, Loading, Paragraph} from '~Root/components';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import React, {useEffect} from 'react';
import {getAskDropDown, onChangeAskType} from '~Root/services/ask/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import {IAskType} from '~Root/services/askType/types';
import {IGlobalState} from '~Root/types';
import {MainNavigatorParamsList} from '~Root/navigation/config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import {SafeAreaView} from 'react-native-safe-area-context';
import Template from '../CreateAsk/Template';
import {adjust} from '~Root/utils';
import styles from '../CreateAsk/styles';
import {useTranslation} from 'react-i18next';

// import {getValidationSchema} from '~Root/utils/functions';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.CREATE_ASK>;

const AskUpdateScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: adjust(20),
  });

  const dispatch = useDispatch();
  const {dataDropDown, selected, data_ask_selected} = useSelector((state: IGlobalState) => state.askState);

  const onBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    dispatch(showLoading());
    dispatch(
      getAskDropDown(() => {
        dispatch(hideLoading());
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!dataDropDown || dataDropDown?.length === 0) return;
    const item = dataDropDown?.find((item: IAskType) => item.code === data_ask_selected?.typeCode);
    if (!item) return;
    dispatch(onChangeAskType({selected: item}));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataDropDown]);

  const onChangeDropDown = (itemValue: any) => {
    if (!itemValue) {
      dispatch(onChangeAskType({selected: null}));
      return;
    }
    const item = dataDropDown?.find((item: IAskType) => item.code === itemValue);
    if (!item) return;
    dispatch(onChangeAskType({selected: item}));
  };

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderSmallBlue onBack={onBack} isBackButton={true} title={`${t('update_ask')}`} />
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView style={GlobalStyles.container}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mh15, GlobalStyles.mb65]}>
              <Paragraph h5 textBlack title='I am...' style={[GlobalStyles.mv15, styles.title]} />
              <View style={[styles.pickerContainer, GlobalStyles.mb15]}>
                <Picker
                  style={styles.picker}
                  itemStyle={styles.pickerItemStyle}
                  dropdownIconColor={BASE_COLORS.whiteColor}
                  selectedValue={selected?.code ?? ''}
                  onValueChange={onChangeDropDown}>
                  <Picker.Item key={`dropdown-0`} label={'PURPOSE OF ASK'} value='' />
                  {dataDropDown?.map((item: IAskType, index: number) => (
                    <Picker.Item key={item.code} label={item.name} value={item.code} />
                  ))}
                </Picker>
              </View>
              {selected && <Template data={selected} navigation={navigation} />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Loading />
    </View>
  );
};

export default AskUpdateScreen;
