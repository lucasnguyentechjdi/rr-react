import * as yup from 'yup';

import {Button, FeedBackBlockItem, Loading, ModalDialogFeedback, Paragraph} from '~Root/components';
import {IUser, IUserState} from '~Root/services/user/types';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import AskAPI from '~Root/services/ask/apis';
import {FEED_BACK_FIELDS} from '~Root/config/fields';
import {GlobalStyles, MESSAGE} from '~Root/config';
import {IGlobalState} from '~Root/types';
import {IIndustryState} from '~Root/services/industry/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import Toast from 'react-native-toast-message';
import {getUserAskData} from '~Root/services/user/actions';
import styles from './styles';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {yupResolver} from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  responderFeedback: yup.string().required(MESSAGE.messageRequired('Feedback for responder')),
  introducerFeedback: yup.string(),
});
type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INDIVIDUAL_MESSAGE_MODAL>;
export interface IUserIntroducer extends IUser {
  introducer: IUser;
}
let timeOutId: any;
export const debounce = (func: (value: string) => void, delay: number) => {
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const FeedBackModalScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

  const {
    register,
    control,
    handleSubmit,
    formState: {errors, isValid},
    setError,
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
  const industryState: IIndustryState = useSelector((state: IGlobalState) => state.industryState);
  const {data_ask_selected} = useSelector((state: IGlobalState) => state.askState);
  const [textSearch, setTextSearch] = useState('');
  const [showModalFeedback, setShowModalFeedback] = useState(false);
  const [listResponder, setListResponder] = useState<any[]>([]);
  const [listIntroducer, setListIntroducer] = useState<any[]>([]);
  const [selectResponder, setSelectResponder] = useState<any>(false);
  const [selectIntroducer, setSelectIntroducer] = useState<any>(false);
  const [tagResponder, setTagResponder] = useState<string[]>([]);
  const [tagIntroducer, setTagIntroducer] = useState<string[]>([]);
  const [typeTag, setTypeTag] = useState('responder');
  const [listTag, setListTag] = useState(
    Array.from(new Set([...industryState.industries, ...userState?.userInfo?.industries])),
  );
  const [tempListTag, setTempListTag] = useState(
    Array.from(new Set([...industryState.industries, ...userState?.userInfo?.industries])),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (textSearch !== '') {
      // dispatch(filterIndustry(textSearch));
    }
  }, [textSearch]);

  useEffect(() => {
    void getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    const {success, data} = await AskAPI.getMemberAsk(data_ask_selected?.code ?? '');
    if (!success) {
      return;
    }
    if (data.length) {
      setListResponder(data);
      setSelectResponder(false);
    }
  };

  const onChangeResponder = (value: any) => {
    if (selectResponder && value.code === selectResponder.code) return;
    setSelectResponder(value);
    if (!value?.introducer) {
      setListIntroducer([]);
      setSelectIntroducer(false);
      return;
    }
    setListIntroducer([value.introducer]);
    setSelectIntroducer(value.introducer);
  };

  const onSubmit = async (value: any) => {
    if (!selectIntroducer && !selectResponder) {
      return;
    }
    if (selectIntroducer && value[FEED_BACK_FIELDS.introducerFeedback] === '') {
      setError('introducerFeedback', {message: MESSAGE.messageRequired('Feedback for introducer'), type: 'required'});
      return;
    }
    const tempValue = {
      chatCode: selectResponder.chatCode ?? '',
      feedback: {
        responder: selectResponder.code,
        responderTag: tagResponder,
        responderFeedback: value[FEED_BACK_FIELDS.responderFeedback],
        introducer: selectIntroducer.code,
        introducerTag: tagIntroducer,
        introducerFeedback: value[FEED_BACK_FIELDS.introducerFeedback],
      },
    };
    const {success, message} = await AskAPI.endAsk(data_ask_selected?.code!, tempValue);
    Toast.show({
      position: 'top',
      type: success ? 'success' : 'error',
      text1: success ? 'End Ask Success' : message,
      visibilityTime: 2000,
      autoHide: true,
    });
    const page = userState?.askPagination?.pageCurrent ?? 1;
    const limit = userState?.askPagination?.recordPerPage ?? 50;
    if (success) {
      dispatch(getUserAskData(page, limit));
      navigation.navigate(AppRoute.TABS);
    }
  };

  const onAddTag = () => {
    setTextSearch('');
    setShowModalFeedback(!showModalFeedback);
  };

  const onSelect = (value: string) => {
    console.log(typeTag, value);
    if (typeTag === 'responder') {
      if (tagResponder.includes(value)) {
        return;
      }
      setTagResponder(values => [...values, value]);
      return;
    }
    if (tagIntroducer.includes(value)) {
      return;
    }
    setTagIntroducer(values => [...values, value]);
  };

  const onRemove = (index: number) => {
    if (typeTag === 'responder') {
      const array = [...tagResponder];
      array.splice(index, 1);

      setTagResponder(array);
      return;
    }
    const array = [...tagIntroducer];
    array.splice(index, 1);
    setTagIntroducer(array);
  };

  const onSave = () => {
    setShowModalFeedback(!showModalFeedback);
  };

  const onAdd = (value: string) => {
    if (listTag.includes(value)) {
      return;
    }
    setListTag([...listTag, value]);
    setTempListTag([...tempListTag, value]);
  };

  const handleChange = (value: string) => {
    setTextSearch(value);
    debounceSearch(value);
  };

  const handleSearch = (value: string) => {
    console.log(value);
    const newValue = listTag.filter(item => {
      const nameLowerCase = item.toLowerCase();
      return nameLowerCase?.includes(value.toLowerCase());
    });
    setTempListTag(newValue);
  };

  const onBack = () => {
    navigation.goBack();
  };

  const debounceSearch = debounce(handleSearch, 200);

  return (
    <View style={[GlobalStyles.container]}>
      <ScrollView contentContainerStyle={styles.scrollContentContainer}>
        <View style={[GlobalStyles.container, GlobalStyles.flexColumn, styles.container]}>
          <Paragraph h5 bold textEerieBlackColor title='Feedback' style={GlobalStyles.mb10} />
          <Paragraph h5 bold textSteelBlueColor title='Responder' style={GlobalStyles.mb10} />
          <FeedBackBlockItem
            data={listResponder}
            title={t('responder_desc')}
            dataSelected={selectResponder}
            onChangeDropDown={onChangeResponder}
            tags={tagResponder}
            errors={errors}
            control={control}
            name={FEED_BACK_FIELDS.responderFeedback}
            register={register}
            multiline={true}
            numberOfLines={4}
            isValid={isValid}
            styleContainer={styles.styleContainer}
            onAddTag={() => {
              onAddTag();
              setTypeTag('responder');
            }}
          />
          <Paragraph h5 bold textSteelBlueColor title='Introducer' style={GlobalStyles.mb10} />
          <FeedBackBlockItem
            data={listIntroducer}
            title={t('introducer_desc')}
            dataSelected={selectIntroducer}
            tags={tagIntroducer}
            allowSelect={false}
            onChangeDropDown={item => setSelectIntroducer(item)}
            errors={errors}
            control={control}
            name={FEED_BACK_FIELDS.introducerFeedback}
            register={register}
            multiline={true}
            numberOfLines={4}
            isValid={isValid}
            styleContainer={styles.styleContainer}
            onAddTag={() => {
              onAddTag();
              setTypeTag('introducer');
            }}
          />
          <View style={[styles.mainButtonContainer, GlobalStyles.flexRow]}>
            <Button
              title={t('cancel')}
              bordered
              h3
              textCenter
              onPress={onBack}
              containerStyle={styles.btnBack}
              textStyle={styles.textStyle}
            />
            <Button
              bordered
              title={t('submit')}
              onPress={handleSubmit(onSubmit)}
              containerStyle={styles.mainButtonArea}
              textStyle={styles.textStyle}
              textWhite
            />
          </View>
        </View>
      </ScrollView>
      {showModalFeedback && (
        <ModalDialogFeedback
          onInputChange={handleChange}
          onSelect={onSelect}
          onRemove={onRemove}
          onSave={onSave}
          onHideModal={onAddTag}
          textSearch={textSearch}
          onAdd={onAdd}
          isVisible={showModalFeedback}
          data={tempListTag}
          dataSelected={typeTag === 'responder' ? tagResponder : tagIntroducer}
        />
      )}
      <Loading />
    </View>
  );
};

export default FeedBackModalScreen;
