import React, {useEffect} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';

import {MainNavigatorParamsList} from '~Root/navigation/config';
import {showLoading, hideLoading} from '~Root/services/loading/actions';
import {getAskDropDown, onChangeAskType} from '~Root/services/ask/actions';
import {AppRoute} from '~Root/navigation/AppRoute';
import {IGlobalState} from '~Root/types';
import {HeaderSmallBlue, Paragraph, Loading, Icon, ModalDialogCommon} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
// import {getValidationSchema} from '~Root/utils/functions';
import {adjust} from '~Root/utils';
import Template from './Template';
import styles from './styles';
import {IAskType} from '~Root/services/askType/types';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.CREATE_ASK>;

const CreateAskScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [showSelectModal, setShowSelectModal] = React.useState(false);
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: adjust(20),
  });

  const dispatch = useDispatch();
  const {dataDropDown, selected} = useSelector((state: IGlobalState) => state.askState);

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

  const onChangeDropDown = (itemValue: any) => {
    setShowSelectModal(false);
    if (!itemValue) {
      dispatch(onChangeAskType({selected: null}));
      return;
    }
    dispatch(onChangeAskType({selected: itemValue}));
  };

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderSmallBlue onBack={onBack} isBackButton={true} title={`${t('create_ask')}`} />
      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView style={GlobalStyles.container}>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mh15, GlobalStyles.mb65]}>
              <Paragraph h5 textBlack title='I am...' style={[GlobalStyles.mv15, styles.title]} />
              <TouchableOpacity
                onPress={() => setShowSelectModal(true)}
                style={[styles.pickerContainer, GlobalStyles.mb15]}>
                <View style={styles.picker}>
                  <Text style={styles.pickerText}>{selected ? selected.name : 'PURPOSE OF ASK'}</Text>
                  <Icon name='caret-down' size={adjust(20)} color={BASE_COLORS.whiteColor} />
                </View>
              </TouchableOpacity>
              {selected && <Template data={selected} navigation={navigation} />}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      {showSelectModal && (
        <ModalDialogCommon
          isVisible={showSelectModal}
          onHideModal={() => setShowSelectModal(false)}
          isDefault={false}
          styleModal={styles.styleModal}
          styleModalContainer={styles.styleModalContainer}>
          <View style={styles.optionList}>
            {dataDropDown?.map((item: any) => {
              if(item.code!=="askType-4"){
                return (
                  <TouchableOpacity onPress={() => onChangeDropDown(item)}>
                    <View style={styles.optionItem}>
                      <Paragraph h5 title={item.name} style={styles.optionTitle} />
                    </View>
                  </TouchableOpacity>
                )
              }
              else{
                return (
                  <></>
                )
              }
            }
            )}
          </View>
        </ModalDialogCommon>
      )}
      <Loading />
    </View>
  );
};

export default CreateAskScreen;
