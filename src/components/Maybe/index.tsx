import * as React from 'react';
import {View} from 'react-native';

type OwnProps = {
  cond: boolean;
}

const Maybe: React.FC<OwnProps> = ({cond, children}) => {

  return <View>{cond ? children : null}</View>
}

export default Maybe;
