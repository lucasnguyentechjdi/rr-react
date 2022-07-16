import * as React from 'react';

import {View, Text, TouchableOpacity} from "react-native";

import style from './styles';

type OwnProps = {
  children?: any;
  titles: string[];
  value: string;
  onChange: (value: number) => void;
}

const TabGroup: React.FC<OwnProps> = ({children, titles, value, onChange}) => {

  const [childTab, setChildTab] = React.useState([]);
  const [currentTabIndex, setCurrentTabIndex] = React.useState(0);

  React.useEffect(() => {
    const childTabs = React.Children.map(children, (child, index) => {
      const tabVal = child.props.tabVal;

      if (tabVal === value) {
        setCurrentTabIndex(index)
        return (
          <View>{child}</View>
        );
      }

      return null;
    });

    setChildTab(childTabs);
  }, [value])

  return (
    <View>
      <View style={[style.tabToolbar]}>
        {(titles || []).map((title, index) =>
        <TouchableOpacity onPress={() => onChange(index)} activeOpacity={0.7} key={title.replace(' ', '')}>
          <View style={[style.toolbarTitle, ...(currentTabIndex === index ? [style.active] : [])]}>
              <Text style={[style.toolbarText, ...(currentTabIndex === index ? [style.activeText] : [])]}>{title}</Text>
            </View>
          </TouchableOpacity>)}
      </View>
      {
        (childTab || []).map((tab: any, index: number) => <View key={index}>{tab}</View>)
      }
    </View>
  )
}

export default TabGroup;
