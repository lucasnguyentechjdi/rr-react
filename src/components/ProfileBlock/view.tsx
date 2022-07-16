import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {IUser} from '~Root/services/user/types';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Category, Icon, Paragraph} from '~Root/components';
import styles from './styles';
import CheckBox from '../CheckBox';

interface Props {
  userInfo: IUser;
}

const ProfileBlockView: React.FC<Props> = ({userInfo}) => {
  const {t} = useTranslation();

  return (
    <View style={GlobalStyles.flexColumn}>
      <View style={styles.tagContainer}>
        <Paragraph h5 title={t('user_industry', {name: userInfo.firstName})} style={styles.titleLeftStyle} />
        {userInfo?.yourIndustries &&
          userInfo?.yourIndustries?.map((item: string, index: number) => (
            <Category
              key={`selected-${index}`}
              itemKey={`${index}`}
              name={item}
              showButton={false}
              onPress={() => {}}
            />
          ))}
      </View>
      <View style={styles.tagContainer}>
        <Paragraph h5 title={t('user_sell_to', {name: userInfo.firstName})} style={styles.titleLeftStyle} />
        {userInfo?.sellToIndustries &&
          userInfo?.sellToIndustries.map((item: string, index: number) => (
            <Category
              key={`selected-client-${index}`}
              itemKey={`${index}`}
              name={item}
              showButton={false}
              onPress={() => {}}
            />
          ))}
        <View style={styles.centerAlign}>
          <View style={styles.subTitleContainer}>
            <CheckBox isChecked={userInfo.sellToAllBusiness ?? false} />
            <Paragraph h5 title='sell to all businesses' style={styles.subTitle} />
          </View>
        </View>
      </View>
      <View style={styles.tagContainer}>
        <Paragraph h5 title={t('user_partners', {name: userInfo.firstName})} style={styles.titleLeftStyle} />
        {userInfo?.partnerIndustries &&
          userInfo?.partnerIndustries.map((item: string, index: number) => (
            <Category
              key={`selected-partner-${index}`}
              itemKey={`${index}`}
              name={item}
              showButton={false}
              onPress={() => {}}
            />
          ))}
      </View>
    </View>
  );
};

export default ProfileBlockView;
