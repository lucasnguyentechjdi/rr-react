import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Button, CheckBox, ModalDialogCommon, Paragraph} from '~Root/components';
import React, {useEffect, useMemo, useState} from 'react';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {AppRoute} from '~Root/navigation/AppRoute';
import {Calendar} from 'react-native-calendars';
import {IGlobalState} from '~Root/types';
import {MainNavigatorParamsList} from '~Root/navigation/config';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import {getUserAskData} from '~Root/services/user/actions';
import {hideLoading} from '~Root/services/loading/actions';
import moment from 'moment';
import styles from './styles';
import {updateAskEndInfo} from '~Root/services/ask/actions';
import {useTranslation} from 'react-i18next';
import Icon from '../Icon';

interface PropsNav {
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, AppRoute.HOME_DETAIL>;
}

interface Props {
  isVisible: boolean;
  isDefault: boolean;
  successCb?: () => void;
  onHideModal: () => void;
  styleModal?: ViewStyle;
}

const ModalChangeDeadLine: React.FC<Props & PropsNav> = ({
  isVisible = false,
  isDefault = false,
  onHideModal = () => {},
  styleModal = {},
  navigation,
  successCb = false,
}) => {
  const {t} = useTranslation();
  const {data_ask_selected} = useSelector((state: IGlobalState) => state.askState);
  const userState = useSelector((state: IGlobalState) => state.userState);
  const [dayDeadline, setDayDeadline] = useState(null);
  const [isChecked, setCheckbox] = useState(false);
  const [dataDates, setDataDates] = useState({});
  const dispatch = useDispatch();

  const initCalendar = useMemo(() => {
    const n = moment().format('YYYY-MM-DD');
    const deadline = moment(data_ask_selected?.endDate).format('YYYY-MM-DD');
    const temp: any = {};
    temp[n] = {
      customStyles: {
        container: {
          backgroundColor: BASE_COLORS.steelBlueColor,
        },
        text: styles.calendarText,
      },
    };
    if (!data_ask_selected?.noEndDate) {
      temp[deadline] = {
        customStyles: {
          container: {
            backgroundColor: BASE_COLORS.indianRedColor,
          },
          text: styles.calendarText,
        },
      };
    }
    return temp;
  }, [data_ask_selected?.endDate]);

  useEffect(() => {
    setDataDates(initCalendar);
  }, []);

  const onCheckboxChange = () => {
    setCheckbox(!isChecked);
    setDataDates(initCalendar);
    setDayDeadline(null);
  };

  const onDayPress = (day: any) => {
    const temp: any = {};
    const keyOfDate = Object.keys(dataDates);
    if (keyOfDate.includes(day?.dateString)) {
      setDataDates(initCalendar);
      setDayDeadline(null);
      return;
    }
    temp[day?.dateString] = {
      customStyles: {
        container: {
          backgroundColor: BASE_COLORS.buffColor,
        },
        text: styles.calendarText,
      },
    };
    setDataDates({
      ...initCalendar,
      ...temp,
    });
    setDayDeadline(day?.dateString);
  };

  const onPress = () => {
    if (!dayDeadline && !isChecked) {
      return;
    }
    dispatch(
      updateAskEndInfo(
        data_ask_selected?.code!,
        {endDate: moment(dayDeadline).format('DD/MM/YYYY'), noEndDate: isChecked},
        (result: any) => {
          dispatch(hideLoading());
          Toast.show({
            position: 'bottom',
            type: result.success ? 'success' : 'error',
            text1: result.success ? t('change_deadline_success') : result.message,
            visibilityTime: 2000,
            autoHide: true,
          });
          if (result.success && !successCb) {
            const page = userState?.askPagination?.pageCurrent ?? 1;
            const limit = userState?.askPagination?.recordPerPage ?? 50;
            dispatch(getUserAskData(page, limit));
            onHideModal();
            navigation.navigate(AppRoute.TABS);
          }
          if (result.success && successCb) {
            successCb();
          }
        },
      ),
    );
  };

  return (
    <ModalDialogCommon
      isVisible={isVisible}
      onHideModal={onHideModal}
      isDefault={isDefault}
      styleModal={{...styles.styleModal, ...styleModal}}
      styleModalContainer={styles.styleModalContainer}>
      <TouchableOpacity onPress={onHideModal} style={styles.closeBtn}>
        <Icon name='times' size={12} color={BASE_COLORS.blackColor} />
      </TouchableOpacity>
      <Paragraph textCenter textSteelBlueColor bold title={t('change_date_deadline')} style={styles.modalHeader} />
      <View style={styles.calendarContainer}>
        {isChecked && <View style={styles.calendarBgDisabled} />}
        <Calendar
          minDate={moment().add(1, 'days').toDate()}
          maxDate={moment().add(366, 'days').toDate()}
          markingType={'custom'}
          onDayPress={onDayPress}
          markedDates={dataDates}
        />
      </View>
      <View style={GlobalStyles.mt15}>
        <Paragraph
          p
          bold
          textSteelBlueColor
          title={
            data_ask_selected?.noEndDate
              ? ''
              : `${t('current_deadline')}: ${moment(data_ask_selected?.endDate).format('DD MMMM YYYY')}`
          }
          style={styles.title}
        />
        <Paragraph
          p
          bold
          textSteelBlueColor
          title={`${t('new_deadline')}: ${
            isChecked ? `${t('no_preferred_deadline')}` : dayDeadline ? moment(dayDeadline).format('DD MMMM YYYY') : ''
          }`}
          style={styles.title}
        />
      </View>
      <CheckBox
        text={t('no_preferred_deadline')}
        isChecked={isChecked}
        onChange={onCheckboxChange}
        style={styles.checkBoxContainer}
        iconStyle={styles.iconStyle}
        textStyle={styles.textStyle}
      />
      <View style={styles.mainButtonContainer}>
        <Button
          bordered
          title={t('change_deadline')}
          onPress={onPress}
          containerStyle={styles.mainButtonArea}
          textStyle={styles.mainButtonTextStyle}
          textWhite
        />
      </View>
    </ModalDialogCommon>
  );
};

export default ModalChangeDeadLine;
