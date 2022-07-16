import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {BASE_COLORS} from '~Root/config';
import {adjust} from '~Root/utils';
import styles from './styles';

const Icon = props => {
  const {style, name, size, enableRTL, ...rest} = props;
  const layoutStyle = enableRTL ? styles.styleRTL : {};
  return <FontAwesome5 name={name} size={adjust(size)} style={StyleSheet.flatten([style, layoutStyle])} {...rest} />;
};

Icon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.number,
  enableRTL: PropTypes.bool,
};

Icon.defaultProps = {
  style: {},
  name: 'home',
  color: BASE_COLORS.whiteColor,
  size: 18,
  enableRTL: false,
};

export default Icon;
