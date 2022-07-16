import * as React from 'react';
import { View } from 'react-native';

import ActionSheet, { registerSheet, SheetProps} from 'react-native-actions-sheet';
import { v4 as uuid } from 'uuid';

import styles from './styles';

type OwnProps = {} & SheetProps;

const BottomSheet: React.FC<OwnProps> = ({sheetId }) => {
  const [content, setContent] = React.useState();
  return (
    <ActionSheet containerStyle={styles.bottomSheetContainer} id={sheetId || uuid()} onBeforeShow={(renderer: any) => setContent(renderer())}>
      <View>{content}</View>
    </ActionSheet>
  );
};

registerSheet('bottomSheet', BottomSheet);

export default BottomSheet;
