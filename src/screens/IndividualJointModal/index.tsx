import * as yup from 'yup';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Button, Icon, IndividualJointBlockItem, Paragraph} from '~Root/components';
import React, {useMemo} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import {IGlobalState} from '~Root/types';
import {IStatus} from '~Root/services/axios/types';
import {MESSAGE_FIELDS} from '~Root/config/fields';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {adjust} from '~Root/utils';
import {createChatExternal} from '~Root/services/feed/actions';
import styles from './styles';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  responderFeedback: yup.string(),
  introducerFeedback: yup.string(),
});

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INDIVIDUAL_MESSAGE_MODAL>;

const IndividualJointModalScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    setFocus,
    formState: {errors, isValid},
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const userState = useSelector((state: IGlobalState) => state.userState);
  const feedState = useSelector((state: IGlobalState) => state.feedState);
  const dispatch = useDispatch();
  const dataAsk = useMemo(() => {
    return feedState.randomDataFeed[feedState.indexAsk];
  }, [feedState.indexAsk]);

  const onBack = () => {
    navigation.goBack();
  };

  const onSubmit = (value: any) => {
    const message = value[`${MESSAGE_FIELDS.individualJoint}`];
    const tempValue = {
      askCode: dataAsk?.code as string,
      responderCode: feedState.userToShare.code as string,
      responderMessage: message !== '' ? message : 'I think both of you would make a great connection!',
      askerMessage: message !== '' ? message : 'I think both of you would make a great connection!',
    };
    dispatch(
      createChatExternal(tempValue, (response: IStatus) => {
        if (!response) {
          return;
        }
        Toast.show({
          position: 'bottom',
          type: response.success ? 'success' : 'error',
          text1: response.message,
          visibilityTime: 4000,
          autoHide: true,
        });
        if (response.success) {
          navigation.goBack();
        }
      }),
    );
  };

  return (
    <View style={GlobalStyles.containerWhite}>
      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <ScrollView style={GlobalStyles.container}>
          <View style={[GlobalStyles.flexColumn, styles.container]}>
            <TouchableOpacity onPress={onBack} style={styles.btnClose}>
              <Icon name='times' size={adjust(15)} color={BASE_COLORS.eerieBlackColor} />
            </TouchableOpacity>
            <View style={[GlobalStyles.flexRow, styles.headerContainer]}>
              <Icon name='question-circle' size={adjust(10)} color={BASE_COLORS.blackColor} style={GlobalStyles.mr10} />
              <Paragraph h5 textSteelBlueColor title={t('joint_message')} />
            </View>
            <IndividualJointBlockItem
              profile={dataAsk.user}
              profileJoint={feedState.userToShare}
              name={MESSAGE_FIELDS.individualJoint}
              register={register}
              multiline={true}
              numberOfLines={4}
              errors={errors}
              control={control}
              isValid={isValid}
              styleContainer={[styles.styleItemContainer, GlobalStyles.mt30, , GlobalStyles.mb20]}
              styleGroupImage={styles.styleGroupImage}
            />
            <Button
              bordered
              title={t('submit')}
              containerStyle={GlobalStyles.mainButtonAreaSteelBlue}
              textStyle={{...GlobalStyles.mainButtonTextStyle, ...GlobalStyles.h5, ...styles.textStyle}}
              textWhite
              disabled={!isValid}
              onPress={handleSubmit(onSubmit)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default IndividualJointModalScreen;
