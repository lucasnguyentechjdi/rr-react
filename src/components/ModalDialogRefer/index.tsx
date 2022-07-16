import {ModalDialogCommon, UserReferBlockItems} from '~Root/components';
import React, {useMemo, useState} from 'react';
import {Text, TextInput, View} from 'react-native';

import {GlobalStyles} from '~Root/config';
import {IGlobalState} from '~Root/types';
import {Trans} from 'react-i18next';
import styles from './styles';
import {useSelector} from 'react-redux';

interface Props {
  visibleModal: boolean;
  isDefault: boolean;
  onSelect: () => void;
  onVisibleModal: () => void;
}

let timeOutId: any;

export const debounce = (func: (value: string) => void, delay: number) => {
  return (...args) => {
    if (timeOutId) clearTimeout(timeOutId);
    timeOutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};

const ModalDialogRefer: React.FC<Props> = ({
  visibleModal = false,
  isDefault = false,
  onVisibleModal = () => {},
  onSelect = () => {},
}) => {
  const feedState = useSelector((state: IGlobalState) => state.feedState);
  const [dataNetwork, setDataNetwork] = useState(feedState?.networks ?? []);

  const dataAsk = useMemo(() => {
    return feedState.randomDataFeed[feedState.indexAsk];
  }, [feedState.indexAsk, feedState.randomDataFeed]);

  const handleChange = (value: string) => {
    debounceSearch(value);
  };
  const handleSearch = (value: string) => {
    const newValue = feedState?.networks.filter(item => {
      const nameLowerCase = `${item?.user?.firstName ?? ''} ${item?.user?.lastName ?? ''}`.toLowerCase();
      return nameLowerCase?.includes(value.toLowerCase());
    });
    setDataNetwork(newValue);
  };

  const debounceSearch = debounce(handleSearch, 200);
  return (
    <>
      <ModalDialogCommon
        isVisible={visibleModal}
        onHideModal={onVisibleModal}
        isDefault={isDefault}
        styleContainer={GlobalStyles.pb0}
        styleModal={GlobalStyles.styleModalSecond}
        styleModalContainer={GlobalStyles.styleModalContainer}>
        <View style={GlobalStyles.pv20}>
          <View style={[GlobalStyles.modalHeader, styles.modalHeader]}>
            <Trans
              i18nKey='you_like_to'
              values={{name: dataAsk.user?.firstName}}
              parent={Text}
              components={{
                highlight: <Text style={[GlobalStyles.p, GlobalStyles.textTealBlueHighlight]} />,
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput placeholder='Search' style={styles.input} onChangeText={value => handleChange(value)} />
          </View>
          {dataNetwork && <UserReferBlockItems data={dataNetwork} onSelect={onSelect} />}
        </View>
      </ModalDialogCommon>
    </>
  );
};

export default ModalDialogRefer;
