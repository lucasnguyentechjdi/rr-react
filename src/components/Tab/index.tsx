import {View} from "react-native";
import * as React from 'react';

type OwnProps = {
  children?: any;
  tabVal: string;
}

const TabView: React.FC<OwnProps> = ({children}) => {

  return (
    <View>
      { children }
    </View>
  )
}

export default TabView;
