import React from 'react';
import {Trans} from 'react-i18next';
import {Text} from 'react-native';

import {IMyAskDefault} from '~Root/services/user/types';
import {PURPOSE_OF_ASK_ENUM, dateFormat2} from '~Root/utils';
import {GlobalStyles} from '~Root/config';

const TransContent: React.FC<IMyAskDefault> = ({
  purpose_of_ask = '',
  a_provider_of = '',
  from_company = '',
  to_talk_about = '',
  looking_for = '',
  based_in = '',
  within_next = '',
}) => {
  let trans;
  const isBasedIn = based_in?.toLowerCase() === 'anywhere';
  const isWithInNext = within_next?.includes('9999');

  switch (purpose_of_ask?.toLocaleLowerCase()) {
    case PURPOSE_OF_ASK_ENUM.SELL:
      if (isBasedIn && !isWithInNext) {
        trans = (
          <Trans
            i18nKey='my_ask_sell_1'
            values={{
              a_provider_of,
              looking_for,
              from_company,
              based_in: based_in?.toLowerCase(),
              within_next: dateFormat2(within_next),
            }}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      } else if (!isBasedIn && isWithInNext) {
        trans = (
          <Trans
            i18nKey='my_ask_sell_2'
            values={{a_provider_of, looking_for, from_company, based_in, within_next: 'no deadline'}}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      } else if (isBasedIn && isWithInNext) {
        trans = (
          <Trans
            i18nKey='my_ask_sell_3'
            values={{
              a_provider_of,
              looking_for,
              to_talk_about,
              based_in: based_in?.toLowerCase(),
              within_next: 'no deadline',
            }}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      } else {
        trans = (
          <Trans
            i18nKey='my_ask_sell_4'
            values={{a_provider_of, looking_for, to_talk_about, based_in, within_next: dateFormat2(within_next)}}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      }
      break;
    case PURPOSE_OF_ASK_ENUM.BUY:
      if (isBasedIn && !isWithInNext) {
        trans = (
          <Trans
            i18nKey='my_ask_buy_1'
            values={{
              looking_for,
              from_company,
              based_in: based_in?.toLowerCase(),
              within_next: dateFormat2(within_next),
            }}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      } else if (!isBasedIn && isWithInNext) {
        trans = (
          <Trans
            i18nKey='my_ask_buy_2'
            values={{looking_for, from_company, based_in, within_next: 'no deadline'}}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      } else if (isBasedIn && isWithInNext) {
        trans = (
          <Trans
            i18nKey='my_ask_buy_3'
            values={{looking_for, from_company, based_in: based_in?.toLowerCase(), within_next: 'no deadline'}}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      } else {
        trans = (
          <Trans
            i18nKey='my_ask_buy_4'
            values={{looking_for, from_company, based_in, within_next: dateFormat2(within_next)}}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      }
      break;
    case PURPOSE_OF_ASK_ENUM.CUSTOM:
    default:
      if (isBasedIn && !isWithInNext) {
        trans = (
          <Trans
            i18nKey='my_ask_custom_1'
            values={{
              looking_for,
              to_talk_about,
              based_in: based_in?.toLowerCase(),
              within_next: dateFormat2(within_next),
            }}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      } else if (!isBasedIn && isWithInNext) {
        trans = (
          <Trans
            i18nKey='my_ask_custom_2'
            values={{looking_for, to_talk_about, based_in, within_next: 'no deadline'}}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      } else if (isBasedIn && isWithInNext) {
        trans = (
          <Trans
            i18nKey='my_ask_custom_3'
            values={{looking_for, to_talk_about, based_in: based_in?.toLowerCase(), within_next: 'no deadline'}}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      } else {
        trans = (
          <Trans
            i18nKey='my_ask_custom_4'
            values={{looking_for, to_talk_about, based_in, within_next: dateFormat2(within_next)}}
            parent={Text}
            components={{
              italic: <Text style={GlobalStyles.textNormal} />,
              bold: <Text style={GlobalStyles.textBlue} />,
            }}
          />
        );
      }
      break;
  }

  return trans;
};

export default TransContent;
