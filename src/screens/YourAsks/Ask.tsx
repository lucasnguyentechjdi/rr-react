import { TouchableOpacity, View } from 'react-native';
import { Button, Icon, ListItems, Paragraph } from '~Root/components';
import { BASE_COLORS, GlobalStyles } from '~Root/config';
import { IAsk, IMyAsk } from '~Root/services/ask/types';

import React from 'react';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tooltip from 'react-native-walkthrough-tooltip';
import { adjust } from '~Root/utils';
import styles from './styles';
import QuestionCircle from './icon/QuestionCircle';

interface IAskProp {
  askState: IAsk[];
  showTooltip: boolean;
  onPress: () => void;
  onTooltipPress: () => void;
  onItemClick: (item: IMyAsk) => void;
}
interface Props {
  contentProps: IAskProp;
  tabLabel?: number;
}

const Ask: React.FC<Props> = ({
  contentProps: { askState, showTooltip = false, onPress, onTooltipPress, onItemClick },
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.askContainer}>
      <View style={styles.askHeader}>
        <Paragraph h3 title={t('your_asks')} style={[styles.titleBlue]} />
        <Tooltip
          isVisible={showTooltip}
          backgroundColor='transparent'
          contentStyle={styles.tooltipContentStyle}
          tooltipStyle={styles.tooltipStyle}
          content={
            <TouchableOpacity style={GlobalStyles.flexColumn} onPress={onTooltipPress}>
              <View style={[GlobalStyles.mb10, GlobalStyles.flexRow]}>
                <Paragraph h4 textWhite title={t('your_asks')} />
                <TouchableOpacity style={styles.tooltipCloseBtn} onPress={onTooltipPress}>
                  <Icon name='times' color={BASE_COLORS.morningBlueColor} size={adjust(12)} />
                </TouchableOpacity>
              </View>
              <Paragraph
                p
                title='An Ask is an easy way to communicate what you are looking for to others'
                style={[GlobalStyles.mb10, styles.tooltipTextColor]}
              />
              <Paragraph
                p
                title='Click on “Create Ask” to quickly craft and share an Ask.'
                style={styles.tooltipTextColor}
              />
            </TouchableOpacity>
          }
          placement='bottom'>
          <TouchableOpacity style={[GlobalStyles.ml10]} onPress={onTooltipPress}>
            <QuestionCircle />
          </TouchableOpacity>
        </Tooltip>
      </View>
      <View style={GlobalStyles.flexColumn}>
        <ListItems data={askState} onItemClick={onItemClick} />
      </View>
      <View style={styles.mainButtonContainer}>
        <Button
          bordered
          title={t('create_ask')}
          onPress={onPress}
          containerStyle={styles.mainButtonArea}
          textStyle={styles.textStyle}
          textWhite
        />
      </View>
    </View>
  );
};
export default React.memo(Ask);
