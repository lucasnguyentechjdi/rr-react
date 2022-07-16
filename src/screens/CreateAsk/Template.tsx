/* eslint-disable @typescript-eslint/restrict-template-expressions */

import * as yup from 'yup';

import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { Button, CheckBox, InputValidateControl, Paragraph } from '~Root/components';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { dateWithMonthsDelay, getValidationSchemaNew } from '~Root/utils/functions';
import { useDispatch, useSelector } from 'react-redux';

import { AppRoute } from '~Root/navigation/AppRoute';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { IAskType } from '~Root/services/askType/types';
import { IField } from '~Root/services/ask/types';
import { IGlobalState } from '~Root/types';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PURPOSE_OF_ASK_TYPE_ENUM } from '~Root/utils/common';
import Toast from 'react-native-toast-message';
import { View } from 'react-native';
import moment from 'moment';
import { setAskPreview } from '~Root/services/ask/actions';
import styles from './styles';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';

interface Props {
  data: IAskType;
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, AppRoute.CREATE_ASK>;
}

const Template: React.FC<Props> = ({ data, navigation }) => {
  const { t } = useTranslation();
  const { data_ask_selected } = useSelector((state: IGlobalState) => state.askState);
  const schema = getValidationSchemaNew(data.template);
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    setFocus,
    watch,
    formState: { errors, isValid },
  } = useForm<any>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const dispatch = useDispatch();
  const [items, setItems] = useState<any>();
  const [modal, showModal] = useState(false);
  const [checkAnyWhere, setCheckAnyWhere] = useState(data_ask_selected?.anywhereInWorld);
  const [checkNoDeadline, setCheckNoDeadline] = useState(data_ask_selected?.noEndDate);
  const watchAllFields = watch();

  const onCreate: SubmitHandler<any> = (credentials: any) => {
    if (!credentials.location && !credentials.anywhereInWorld) {
      return Toast.show({
        position: 'bottom',
        type: 'error',
        text1: t('location_or_anywhere_required'),
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    if (!credentials.endDate && !credentials.noEndDate) {
      return Toast.show({
        position: 'bottom',
        type: 'error',
        text1: t('end_date_or_no_dead_line_required'),
        visibilityTime: 2000,
        autoHide: true,
      });
    }
    if (credentials) {
      const prepareItem = {
        label: data.name,
        endDate: credentials.endDateMoment,
        content: {
          info: credentials.info,
          target: credentials.target,
          detail: credentials.detail,
        },
        location: credentials.location,
        additionalInformation: credentials.additionalInformation,
        anywhereInWorld: credentials.anywhereInWorld ?? false,
        noEndDate: credentials.noEndDate ?? false,
        typeCode: data.code,
        askType: data,
      };
      dispatch(setAskPreview(data?.code, { data: prepareItem, ...prepareItem }));
      navigation.navigate(AppRoute.ASK_PREVIEW);
    }
  };

  const onShowDatePicker = (item: IField) => {
    if (checkNoDeadline) {
      return false;
    }
    showModal(!modal);
  };

  const onChangeDatePicker = (date: Date, item: IField) => {
    let currentDate = date || new Date();
    currentDate = dateWithMonthsDelay(currentDate, 0);
    setValue(item?.name, moment(currentDate).format('MMM DD YYYY'));
    setValue(`${item?.name}Moment`, moment(currentDate).toISOString());
  };

  const onCheckBoxChange = (isChecked: boolean, item: IField) => {
    setCheckAnyWhere(isChecked);
    setValue(item?.options?.name, isChecked);
    setValue(item?.name, '');
    setItems((prevState: any) => ({ ...prevState, [item?.options?.name]: isChecked, [item?.name]: '' }));
  };

  const onCheckBoxDateChange = (isChecked: boolean, item: IField) => {
    setCheckNoDeadline(isChecked);
    setValue(item?.options?.name, isChecked);
    setValue(item?.name, '');
    setItems((prevState: any) => ({ ...prevState, [item?.options?.name]: isChecked, [item?.name]: '' }));
  };

  const onSubmitEditing = (index: number) => {
    if (data?.template.length > 0 && data?.template[index + 1]) {
      setFocus(data?.template[index + 1]?.name);
    }
  };

  useEffect(() => {
    if (!data_ask_selected) return;
    Object.keys(data_ask_selected).forEach((key: string) => {
      if (['_id', 'code'].includes(key)) return;
      setValue(key, data_ask_selected[key]);
      if (key === 'content') {
        Object.keys(data_ask_selected[key]).forEach((key2: string) => {
          console.log(key2);
          setValue(key2, data_ask_selected[key][key2]);
        });
      }
      if (key === 'endDate' && data_ask_selected.noEndDate) {
        setValue(key, null);
        setValue(`${key}Moment`, null);
      }
      if (key === 'endDate' && !data_ask_selected.noEndDate) {
        setValue(key, moment(data_ask_selected[key]).format('MMM DD YYYY'));
        setValue(`${key}Moment`, moment(data_ask_selected[key]).toISOString());
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTemplate = (item: IField, index: number) => {
    switch (true) {
      case item?.type === PURPOSE_OF_ASK_TYPE_ENUM.TEXT && !item?.options?.max_length:
        return (
          <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15]} key={`template-textfield-${index}`}>
            <InputValidateControl
              label={item?.options?.label}
              placeholder={item?.options?.placeholder}
              placeholderTextColor={BASE_COLORS.lightPinkColor}
              inputStyle={item?.name === 'location' ? styles.inputStyle : styles.textAreaStyle}
              labelStyle={styles.labelStyle}
              // selectionColor={BASE_COLORS.blackColor}
              inputErrorStyle={!isValid && styles.inputErrorStyle}
              errors={errors}
              control={control}
              name={item?.name}
              editable={item.name !== 'location' ? true : !checkAnyWhere}
              register={register}
              onSubmitEditing={() => onSubmitEditing(index)}
              autoFocus={index === 0}
              multiline={item?.name !== 'location'}
            />
            {item?.options?.checkbox && (
              <CheckBox
                isChecked={checkAnyWhere}
                item={item}
                text={item?.options?.checkbox}
                style={styles.checkbox}
                onChange={onCheckBoxChange}
              />
            )}
          </View>
        );
      case item?.type === PURPOSE_OF_ASK_TYPE_ENUM.CALENDAR:
        return (
          <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15]} key={`template-calendar-${index}`}>
            <InputValidateControl
              label={item?.options?.label}
              placeholder={item?.options?.placeholder}
              placeholderTextColor={BASE_COLORS.lightPinkColor}
              inputStyle={styles.inputStyle}
              labelStyle={styles.labelStyle}
              // selectionColor={BASE_COLORS.blackColor}
              inputErrorStyle={!isValid && styles.inputErrorStyle}
              errors={errors}
              control={control}
              name={item?.name}
              editable={false}
              register={register}
              onPressIn={() => onShowDatePicker(item)}
            />
            <DateTimePickerModal
              key={`template-date-${index}`}
              isVisible={modal}
              mode='date'
              minimumDate={moment().add(1, 'days').toDate()}
              maximumDate={moment().add(366, 'days').toDate()}
              onConfirm={(date: Date) => onChangeDatePicker(date, item)}
              onCancel={() => onShowDatePicker(item)}
            />
            {item?.options?.checkbox && (
              <CheckBox
                key={`template-checkbox-${index}`}
                isChecked={checkNoDeadline}
                item={item}
                text={item?.options?.checkbox}
                style={styles.checkbox}
                onChange={onCheckBoxDateChange}
              />
            )}
          </View>
        );
      case item?.type === PURPOSE_OF_ASK_TYPE_ENUM.TEXT && !!item?.options?.max_length:
        return (
          <View style={[GlobalStyles.flexColumn, GlobalStyles.mb15]} key={`template-textbox-${index}`}>
            <InputValidateControl
              label={item?.options?.label}
              placeholder={item?.options?.placeholder}
              placeholderTextColor={BASE_COLORS.lightPinkColor}
              inputStyle={styles.textAreaStyle}
              labelStyle={styles.labelStyle}
              // selectionColor={BASE_COLORS.blackColor}
              inputErrorStyle={!isValid && styles.inputErrorStyle}
              errors={errors}
              control={control}
              name={item?.name}
              register={register}
              onSubmitEditing={() => onSubmitEditing(index)}
              numberOfLines={15}
              autoFocus={index === 0}
              multiline={!!item?.options?.max_length}
              maxLength={item?.options?.max_length}
              >
              <Paragraph
                title={`${watchAllFields[item?.name]?.length ?? 0} / ${item?.options?.max_length ?? 0}`}
                style={styles.textAreaCountStyle}
              />
            </InputValidateControl>
          </View>
        );
      default:
        return (
          <InputValidateControl
            key={`template-default-${index}`}
            label={item?.options?.label}
            placeholder={item?.options?.placeholder}
            placeholderTextColor={BASE_COLORS.lightPinkColor}
            inputStyle={styles.inputStyle}
            labelStyle={styles.labelStyle}
            inputErrorStyle={!isValid && styles.inputErrorStyle}
            // selectionColor={BASE_COLORS.blackColor}
            errors={errors}
            control={control}
            name={item?.name}
            register={register}
            autoFocus={index === 0}
            onSubmitEditing={() => onSubmitEditing(index)}
          />
        );
    }
  };

  return (
    <View style={GlobalStyles.flexColumn}>
      {data?.template.length && data?.template.map(renderTemplate)}
      <View style={styles.mainButtonContainer}>
        <Button
          bordered
          title={t(data_ask_selected ? 'update_ask' : 'create_ask')}
          onPress={handleSubmit(onCreate)}
          containerStyle={styles.mainButtonArea}
          textStyle={styles.textStyle}
        />
      </View>
    </View>
  );
};

export default Template;
