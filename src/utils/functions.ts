import * as yup from 'yup';

import { IField, IFields } from '~Root/services/ask/types';
import { PixelRatio, Platform } from 'react-native';

import { adjust } from '.';
import moment from 'moment';

export const dateWithMonthsDelay = (dateNow: Date, months: number) => {
  const date = dateNow || new Date();
  date.setMonth(date.getMonth() + months);

  return date;
};

const pad2 = (n: number) => {
  return (n < 10 ? '0' : '') + `${n}`;
};

enum DateFormat {
  format1 = 'dd-mm-YYYY',
  format2 = 'YYYY-mm-dd',
}

export const convertFromStringToDate = (responseDate: string) => {
  const dateComponents = responseDate.split('/');
  return new Date(`${dateComponents[2]}-${dateComponents[1]}-${dateComponents[0]}`);
};

export const dateFormat = (date: Date, separator?: string, format?: string): string => {
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const year = date.getFullYear();
  separator = separator ?? '/';
  format = format ?? DateFormat.format1;

  switch (format) {
    case DateFormat.format1:
      return `${day}${separator}${month}${separator}${year}`;
    case DateFormat.format2:
    default:
      return `${year}${separator}${month}${separator}${day}`;
  }
};

export const dateFormat2 = (date: string): string => {
  return moment(date, 'YYYY-MM-DD').format('MMM DD, YYYY');
};

export const dateFormat3 = (date: Date): string => {
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const dateToHours = (date: Date | string) => {
  if (!date || !isDate(date)) {
    return '';
  }
  return `${moment(date).diff(moment(), 'hours')}`;
};

export const timeLeftFormat = (date: Date | string) => {
  if (!date || !isDate(date)) {
    return '';
  }
  const hours = moment(date).diff(moment(), 'hours');
  const weeks = moment(date).diff(moment(), 'weeks');
  const days = moment(date).diff(moment(), 'days');
  const months = moment(date).diff(moment(), 'months');
  if (hours <= 48) {
    return `${hours} hours left`;
  }
  if (days <= 7) {
    return `${days} days left`;
  }
  if (weeks <= 4) {
    return `${weeks} weeks left`;
  }
  if (months === 1) {
    return `${months} month left`;
  }
  return `${months} months left`;
};

export const checkHourLeft = (date: Date | string) => {
  if (!date || !isDate(date)) {
    return '';
  }
  const hours = moment(date).diff(moment(), 'hours');
  if (hours <= 1) {
    return true;
  }
  return false;
};

const isDate = (date: any) => {
  return !!Date.parse(date);
};

export const transformCapitalize = (text: string) => {
  if (!text) {
    return false;
  }
  const firstCharacter = text.substring(0, 1);
  const restString = text.substring(1);

  return firstCharacter.toUpperCase() + restString;
};

export const headerByRatio = () => {
  let top = '2%';
  let marginTop = '0%';
  const value = PixelRatio.get();
  const isIos = Platform.OS === 'ios';
  switch (true) {
    case value >= 3 && value < 3.5 && !isIos:
      top = '0%';
      marginTop = '0%';
      break;
    case value >= 3.5 && !isIos:
      top = '2%';
      marginTop = '2%';
      break;
  }
  return { top, marginTop };
};

export const buttonPositionByRatio = () => {
  let bottom = '15%';
  let bottomHomeShare = '8%';
  const value = PixelRatio.get();
  const isIos = Platform.OS === 'ios';

  switch (true) {
    case value >= 3 && value < 3.5 && !isIos:
      bottom = '2%';
      bottomHomeShare = '5%';
      break;
    case value >= 2 && value < 3:
      bottom = '20%';
      break;
    case value >= 3.5 && !isIos:
      bottom = '20%';
      break;
  }
  return { bottom, bottomHomeShare };
};

export const commonByRatio = () => {
  let paddingVertical = 20;
  let marginTop = 20;
  let widthOnboard = '70%';
  const value = PixelRatio.get();
  const isIos = Platform.OS === 'ios';

  switch (true) {
    case value >= 3 && !isIos:
      paddingVertical = 10;
      marginTop = 10;
      widthOnboard = '50%';
      break;
  }
  return { paddingVertical, marginTop, widthOnboard };
};

export const isRatioNormal = () => {
  let isNormal = true;
  const value = PixelRatio.get();
  const isIos = Platform.OS === 'ios';

  switch (true) {
    case value >= 3 && !isIos:
      isNormal = false;
      break;
  }
  return isNormal;
};

export const lineHeightByRatio = (lineHeight = 0) => {
  return PixelRatio.get() < 2 ? PixelRatio.roundToNearestPixel(lineHeight * 2) : lineHeight;
};

export const paddingByRatio = (padding = 0) => {
  return PixelRatio.get() < 2 ? PixelRatio.roundToNearestPixel(padding) * 2 : padding;
};

export const heightByRatio = (height = 0) => {
  return PixelRatio.get() < 2 ? PixelRatio.roundToNearestPixel(height) * 2 : height;
};

const parseType = (type: string) => {
  switch (type) {
    case 'number':
      return 'number';
    case 'text':
      return 'string';
    default:
      return 'string';
  }
};

export const getValidationSchemaNew = (fields: IField[]) => {
  const schema: any = {};
  fields.forEach((field: IField) => {
    const { name, type, options } = field;

    if (!type) {
      return;
    }
    let rule: any = false;
    switch (type) {
      case 'text':
        rule = yup.string();
        break;
      case 'number':
        rule = yup.string();
        break;
      default:
        break;
    }
    if (!rule) return;
    if (options.required) {
      rule = rule.required('Field is required');
    }
    schema[name] = rule;
  });
  return yup.object().shape(schema);
};

export const getValidationSchema = (fields: IFields) => {
  const schema = fields.structure.reduce((schema: any = {}, field: IField) => {
    const { id, type, options } = field;

    if (!yup[parseType(type)]) {
      return schema;
    }

    let validator = yup[parseType(type)]();
    if (options.required) {
      // eslint-disable-next-line @typescript-eslint/dot-notation
      validator = validator['required']();
    }
    return schema.concat(yup.object().shape({ [id]: validator }));
  }, yup.object().shape({}));
  return schema;
};

export const headerTop = () => {
  // if (PixelRatio.get() < 2) {
  //   return Platform.OS === 'ios' ? '60%' : '30%';
  // } else {
  //   return Platform.OS === 'ios' ? adjust(55) : adjust(30);
  // }
  return Platform.OS === 'ios' ? adjust(55) : adjust(30);
};

export const shuffle = (array: any) => {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};

export const objectToQueryString = (obj: any) => {
  return Object.keys(obj)
    .map(key => key + '=' + obj[key])
    .join('&');
};

export const upperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const findObjectInArray = <T>(array: Array<T>, findValue: string, key: string, text: string) => {
  const result = array.filter((x: T) => x[key] === findValue);
  if (result.length > 0) {
    return result[0][text];
  }
  return findValue;
};
