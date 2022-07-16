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
  title: any;
  onPressLeft: any;
  renderLeft: any;
  renderCenter: any;
}

export default function HeaderFormat(props: Props) {
  const {style, styleLeft, styleTitleContainer, styleTitle, title, onPressLeft, renderLeft, renderCenter} = props;

  return (
    <SafeAreaView style={styles.widthFull} edges={['top', 'left', 'right']}>
      <View style={[styles.contain, style]}>
        <View style={styles.flexRow}>
          <TouchableOpacity style={[styles.contentLeft, styleLeft]} onPress={onPressLeft}>
            {renderLeft()}
          </TouchableOpacity>
        </View>
        <View style={[styles.titleContainer, styleTitleContainer]}>
          <Text style={[styles.title, styleTitle]}>{title}</Text>
          {renderCenter()}
        </View>
      </View>
    </SafeAreaView>
  );
}

HeaderFormat.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleIconLeftSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitleContainer: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleTitle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderCenter: PropTypes.func,
  renderLeftEditIcon: PropTypes.func,
  onPressLeft: PropTypes.func,
  title: PropTypes.string,
  barStyle: PropTypes.string,
};

HeaderFormat.defaultProps = {
  style: {},
  styleLeft: {},
  styleIconLeftSecond: {},
  styleTitleContainer: {},
  styleTitle: {},
  renderLeft: () => {},
  renderCenter: () => {},
  renderLeftSecond: () => {},
  renderLeftEditIcon: () => {},
  onPressLeft: () => {},
  title: 'Title',
  barStyle: '',
  showLeftIcon: false,
};
