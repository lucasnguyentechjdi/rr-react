import Ionicons from 'react-native-vector-icons/Ionicons';
import {Button, Category, Icon, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';

import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import {IUserState} from '~Root/services/user/types';
import {adjust} from '~Root/utils';
import CheckIcon from './icon/CheckIcon';
import styles from './styles';

interface Props {
  userInfo: IUserState['userInfo'];
  edit: boolean;
  onDelete: ({index, target}: {index: number; target: string}) => void;
  handleIndustry: ({title, target}: {title: string; target: string}) => void;
  handleChangeSellToBusiness: () => void;
}

const ProfileBlock: React.FC<Props> = ({
  userInfo,
  edit = false,
  onDelete = () => {},
  handleIndustry = () => {},
  handleChangeSellToBusiness = () => {},
}) => {
  const {t} = useTranslation();
  const [showTooltipOne, setShowTooltipOne] = React.useState(false);
  const [showTooltipTwo, setShowTooltipTwo] = React.useState(false);
  const [showTooltipThree, setShowTooltipThree] = React.useState(false);

  return (
    <View style={GlobalStyles.flexColumn}>
      <View style={styles.tagContainer}>
        <View style={styles.titleFlex}>
          <Paragraph h4 title={edit ? t('your_industry_domain') : t('my_industry_domain')} style={styles.titleStyle} />
          {edit && (
            <Tooltip
              isVisible={showTooltipOne}
              onClose={() => setShowTooltipOne(false)}
              backgroundColor='transparent'
              contentStyle={styles.tooltipContentStyleLong}
              tooltipStyle={styles.tooltipStyle}
              content={
                <View>
                  <View style={[GlobalStyles.mb10, GlobalStyles.flexRow]}>
                    <Paragraph h5 textWhite title={t('your_industry_domain')} style={GlobalStyles.mt10} />
                    <TouchableOpacity style={styles.tooltipCloseBtn} onPress={() => setShowTooltipTwo(!showTooltipTwo)}>
                      <Icon name='times' color={BASE_COLORS.morningBlueColor} size={adjust(20)} />
                    </TouchableOpacity>
                  </View>
                  <Paragraph
                    p
                    title='Industries you are working in currently.'
                    style={[GlobalStyles.mb10, styles.tooltipTextColor]}
                  />
                </View>
              }
              placement='bottom'>
              <TouchableOpacity onPress={() => setShowTooltipOne(!showTooltipOne)}>
                <Ionicons
                  name='help-circle'
                  color={BASE_COLORS.davysGreyColor}
                  size={adjust(22)}
                  style={GlobalStyles.ml5}
                />
              </TouchableOpacity>
            </Tooltip>
          )}
        </View>
        {userInfo?.yourIndustries &&
          userInfo?.yourIndustries?.map((item: string, index: number) => (
            <Category
              key={`selected-${index}`}
              itemKey={`${index}`}
              name={item}
              showButton={edit}
              onPress={edit ? () => onDelete({index, target: 'yourIndustries'}) : () => {}}
            />
          ))}
        {edit && (
          <View style={styles.centerAlign}>
            <Button
              title='Add'
              isIconRight={true}
              onPress={() => handleIndustry({title: t('your_industry'), target: 'yourIndustries'})}
              type='outlined'
              containerStyle={styles.buttonContainer}
              textStyle={styles.buttonTextStyle}>
              <Icon name='plus' size={14} color={BASE_COLORS.gunmetalColor} enableRTL={true} />
            </Button>
          </View>
        )}
      </View>
      <View style={styles.tagContainer}>
        <View style={styles.titleFlex}>
          <Paragraph h4 title={edit ? t('you_sell_to') : t('i_sell_to')} style={styles.titleStyle} />
          {edit && (
            <Tooltip
              isVisible={showTooltipTwo}
              onClose={() => setShowTooltipTwo(false)}
              backgroundColor='transparent'
              contentStyle={styles.tooltipContentStyleLong}
              tooltipStyle={styles.tooltipStyle}
              content={
                <View>
                  <View style={[GlobalStyles.mb10, GlobalStyles.flexRow]}>
                    <Paragraph h5 textWhite title={'Industries You Sell To'} style={GlobalStyles.mt10} />
                    <TouchableOpacity style={styles.tooltipCloseBtn} onPress={() => setShowTooltipTwo(!showTooltipTwo)}>
                      <Icon name='times' color={BASE_COLORS.morningBlueColor} size={adjust(20)} />
                    </TouchableOpacity>
                  </View>
                  <Paragraph
                    p
                    title='Industries you do sell or promote your business to.'
                    style={[GlobalStyles.mb10, styles.tooltipTextColor]}
                  />
                </View>
              }
              placement='bottom'>
              <TouchableOpacity onPress={() => setShowTooltipTwo(!showTooltipTwo)}>
                <Ionicons
                  name='help-circle'
                  color={BASE_COLORS.davysGreyColor}
                  size={adjust(22)}
                  style={GlobalStyles.ml5}
                />
              </TouchableOpacity>
            </Tooltip>
          )}
        </View>
        {userInfo?.sellToIndustries &&
          userInfo?.sellToIndustries.map((item: string, index: number) => (
            <Category
              key={`selected-client-${index}`}
              itemKey={`${index}`}
              name={item}
              showButton={edit}
              onPress={edit ? () => onDelete({index, target: 'sellToIndustries'}) : () => {}}
            />
          ))}
        <View style={styles.centerAlign}>
          {edit && (
            <Button
              disabled={userInfo.sellToAllBusiness ?? false}
              title='Add'
              isIconRight={true}
              onPress={() => handleIndustry({title: t('you_sell_to'), target: 'sellToIndustries'})}
              type='outlined'
              containerStyle={userInfo.sellToAllBusiness ? styles.disabledButtonContainer : styles.buttonContainer}
              textStyle={userInfo.sellToAllBusiness ? styles.disabledButtonTextStyle : styles.buttonTextStyle}>
              <Icon
                name='plus'
                size={14}
                color={userInfo.sellToAllBusiness ? BASE_COLORS.spanishGrayColor : BASE_COLORS.gunmetalColor}
                enableRTL={true}
              />
            </Button>
          )}
          {edit && (
            <View style={styles.subTitleContainer}>
              {/* <CheckBox
                isChecked={userInfo.sellToAllBusiness || true}
                onChange={changeSellToAllBusiness}
              /> */}
              <TouchableOpacity style={styles.checkBoxContainer} onPress={() => handleChangeSellToBusiness()}>
                <View style={styles.checkIcon}>{userInfo?.sellToAllBusiness && <CheckIcon />}</View>
              </TouchableOpacity>
              <Paragraph h5 title='sell to all businesses' style={styles.subTitle} />
            </View>
          )}
          {!edit && userInfo.sellToAllBusiness && (
            <View style={styles.subTitleContainer}>
              <Paragraph h5 title='Sell to all businesses' style={styles.subTitle} />
            </View>
          )}
        </View>
      </View>
      <View style={styles.tagContainer}>
        <View style={styles.titleFlex}>
          <Paragraph
            h4
            title={edit ? t('industry_you_collaborate') : t('industry_i_collaborate')}
            style={styles.titleStyle}
          />
          {edit && (
            <Tooltip
              isVisible={showTooltipThree}
              onClose={() => setShowTooltipThree(false)}
              backgroundColor='transparent'
              contentStyle={styles.tooltipContentStyleLong}
              tooltipStyle={styles.tooltipStyle}
              content={
                <View>
                  <View style={[GlobalStyles.mb10, GlobalStyles.flexRow]}>
                    <Paragraph h5 textWhite title={'Industries Of Your Partners'} style={GlobalStyles.mt10} />
                    <TouchableOpacity
                      style={styles.tooltipCloseBtn}
                      onPress={() => setShowTooltipThree(!showTooltipThree)}>
                      <Icon name='times' color={BASE_COLORS.morningBlueColor} size={adjust(20)} />
                    </TouchableOpacity>
                  </View>
                  <Paragraph
                    p
                    title='Industries your partners are involved in.'
                    style={[GlobalStyles.mb10, styles.tooltipTextColor]}
                  />
                </View>
              }
              placement='bottom'>
              <TouchableOpacity onPress={() => setShowTooltipThree(!showTooltipThree)} style={{marginLeft: 'auto'}}>
                <Ionicons
                  name='help-circle'
                  color={BASE_COLORS.davysGreyColor}
                  size={adjust(22)}
                  style={GlobalStyles.ml5}
                />
              </TouchableOpacity>
            </Tooltip>
          )}
        </View>
        {userInfo?.partnerIndustries &&
          userInfo?.partnerIndustries.map((item: string, index: number) => (
            <Category
              key={`selected-partner-${index}`}
              itemKey={`${index}`}
              name={item}
              showButton={edit}
              onPress={edit ? () => onDelete({index, target: 'partnerIndustries'}) : () => {}}
            />
          ))}
        {edit && (
          <View style={styles.centerAlign}>
            <Button
              title='Add'
              isIconRight={true}
              onPress={() => handleIndustry({title: t('your_partners'), target: 'partnerIndustries'})}
              type='outlined'
              containerStyle={styles.buttonContainer}
              textStyle={styles.buttonTextStyle}>
              <Icon name='plus' size={14} color={BASE_COLORS.gunmetalColor} enableRTL={true} />
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

export default ProfileBlock;
