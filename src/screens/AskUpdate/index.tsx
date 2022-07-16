import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {HeaderSmallBlue, Loading, Paragraph, Icon, ModalDialogCommon} from '~Root/components';
import {KeyboardAvoidingView, Platform, ScrollView, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {getAskDropDown, onChangeAskType} from '~Root/services/ask/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {useDispatch, useSelector} from 'react-redux';
import {AppRoute} from '~Root/navigation/AppRoute';
import {IAskType} from '~Root/services/askType/types';
import {IGlobalState} from '~Root/types';
import {MainNavigatorParamsList} from '~Root/navigation/config';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
  const [showSelectModal, setShowSelectModal] = React.useState(false);

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
    setShowSelectModal(false);
    if (!itemValue) {
      dispatch(onChangeAskType({selected: null}));
      return;
    }
    dispatch(onChangeAskType({selected: itemValue}));
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
            <TouchableOpacity onPress={() => onChangeDropDown(null)}>
              <View style={styles.optionItem}>
                <Paragraph h5 title={'PURPOSE OF ASK'} style={styles.optionTitle} />
              </View>
            </TouchableOpacity>
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

export default AskUpdateScreen;
