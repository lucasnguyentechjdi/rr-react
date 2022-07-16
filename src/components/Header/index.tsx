import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import PropTypes from 'prop-types';

export interface Props {
  style: any;
  styleLeft: any;
  styleLeftSecond?: any;
  styleIconLeftSecond: any;
  styleTitleContainer: any;
  styleTitle: any;
  styleSubTitle: any;
  styleRight: any;
  styleRightSecond: any;
  title: any;
  subTitle: any;
  onPressLeft: any;
  onPressRight: any;
  onPressRightSecond: any;
  renderLeft: any;
  renderLeftSecond: any;
  renderLeftEditIcon: any;
  renderRightSecond: any;
  renderRight: any;
  showRight: boolean;
}

export default function Header(props: Props) {
  const {
    style,
    styleLeft,
    styleLeftSecond,
    styleIconLeftSecond,
    styleTitleContainer,
    styleTitle,
    styleSubTitle,
    styleRight,
    styleRightSecond,
    title,
    subTitle,
    onPressLeft,
    onPressRight,
    onPressRightSecond,
    renderLeft,
    renderLeftSecond,
    renderLeftEditIcon,
    renderRightSecond,
    renderRight,
    showRight,
  } = props;

  return (
    <SafeAreaView style={styles.widthFull} edges={['top', 'left', 'right']}>
      <View style={[styles.contain, style]}>
        <View style={[styles.container, styles.flexRow]}>
          <TouchableOpacity style={[styles.contentLeft, styleLeft]} onPress={onPressLeft}>
            {renderLeft()}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.contentLeftSecond, styleLeftSecond]} onPress={onPressLeft}>
            {renderLeftSecond()}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconLeftSecond, styleIconLeftSecond]}>
            {renderLeftEditIcon()}
          </TouchableOpacity>
        </View>
        <View style={[styles.titleContainer, styleTitleContainer]}>
          <Text style={[styles.title, styleTitle]}>{title}</Text>
          {subTitle !== '' && <Text style={[styles.subTitle, styleSubTitle]}>{subTitle}</Text>}
        </View>
        {showRight && (
          <View style={styles.right}>
            <TouchableOpacity style={[styles.contentRightSecond, styleRightSecond]} onPress={onPressRightSecond}>
              {renderRightSecond()}
            </TouchableOpacity>
            <TouchableOpacity style={[styles.contentRight, styleRight]} onPress={onPressRight}>
              {renderRight()}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleIconLeftSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitleContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleSubTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderLeftEditIcon: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
  showRight: PropTypes.bool,
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleIconLeftSecond: {},
  styleTitleContainer: {},
  styleTitle: {},
  styleSubTitle: {},
  styleRight: {},
  styleRightSecond: {},
  renderLeft: () => {},
  renderLeftSecond: () => {},
  renderLeftEditIcon: () => {},
  renderRight: () => {},
  renderRightSecond: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  title: 'Title',
  subTitle: '',
  barStyle: '',
  showRight: false,
  showLeftIcon: false,
};
