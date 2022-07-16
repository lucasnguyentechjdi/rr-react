import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {ButtonSecond, Category, Icon, Paragraph} from '~Root/components';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';

import {IIndustry} from '~Root/services/industry/types';
import Modal from 'react-native-modal';
import React from 'react';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import {updateDataIndustry} from '~Root/services/industry/actions';
import {industriesDefaultData} from './industriesDefaultData';

interface Props {
  isVisible: boolean;
  onSelect: (item: string) => void;
  onClose: (index: number) => void;
  onSave: (data: string[]) => void;
  onInputChange: (text: string) => void;
  onHideModal: () => void;
  onAdd: (item: string) => void;
  data?: any;
  dataSelected?: string[];
  textSearch?: string;
  title?: string;
}

const ModalDialog: React.FC<Props> = ({
  isVisible,
  onSelect,
  onClose,
  onSave,
  onInputChange,
  onHideModal,
  onAdd,
  data = [],
  dataSelected,
  textSearch,
  title,
}) => {
  const [selected, setSelected] = React.useState<string[]>(dataSelected ?? []);
  const {industries} = useSelector((state: IGlobalState) => state.industryState);
  const dataIndustry = [...industriesDefaultData, ...JSON.parse(JSON.stringify(industries))];
  const [dataSelect, setDataSelect] = React.useState<string[]>(
    dataIndustry.filter((item: string) => !dataSelected?.includes(item)),
  );
  const [dataFilter, setDataFilter] = React.useState<string[]>([]);
  const [text, setText] = React.useState<string>('');
  const [warningIndustryAmount, setWarningIndustryAmount] = React.useState<boolean>(false);
  const dispatch = useDispatch();

  const onSelected = (item: string) => {
    setSelected([...selected, item]);
    setDataSelect(dataSelect.filter((itemData: string) => itemData !== item));
  };

  const onRemove = (item: string) => {
    setSelected(selected.filter((itemData: string) => itemData !== item));
    setDataSelect([...dataSelect, item]);
  };

  const onChangeSearch = (text: string) => {
    if (!text) {
      setDataFilter([]);
      setText(text);
      return;
    }
    const result = industriesDefaultData.filter((item: string) => item.toLowerCase().includes(text.toLowerCase()));
    console.log(industries);
    setDataFilter(result);
    setText(text);
  };

  const onAddIndustry = (item: string) => {
    if (!item) return;
    dispatch(updateDataIndustry([...industries, item]));
    console.log([...dataSelect, item]);
    setDataSelect([...dataSelect, item]);
    onSelected(item);
    setText('');
    onChangeSearch('');
  };

  const handleSave = (selected: string[]) => {
    if (selected.length > 6) {
      setWarningIndustryAmount(true);
      setTimeout(() => {
        setWarningIndustryAmount(false);
      }, 2000);
      return;
    }
    onSave(selected);
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onHideModal}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}>
        <View style={[styles.container, styles.modal]}>
          <Paragraph h5 bold style={styles.title} title={title} />
          <View style={styles.inputContainer}>
            <Icon name='search' color={BASE_COLORS.oxleyColor} size={20} style={styles.iconSearch} />
            <TextInput placeholder='Search' value={text} style={styles.input} onChangeText={onChangeSearch} />
          </View>
          <FlatList
            style={styles.listItemContainer}
            contentContainerStyle={styles.listContainer}
            nestedScrollEnabled={true}
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={true}
            data={text ? dataFilter : dataSelect}
            numColumns={1}
            key={'grid'}
            keyExtractor={(item, index) => `grid-${index}`}
            renderItem={({item, index}: {item: string; index: number}) => (
              <View key={`item-${index}`} style={styles.itemContainer}>
                <TouchableOpacity onPress={() => onSelected(item)} style={styles.item}>
                  <Paragraph h5 textBlack title={item} />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.btnAddContainer}>
            <TouchableOpacity style={styles.btnAdd} onPress={() => onAddIndustry(text)}>
              <Icon name='plus' size={12} color={BASE_COLORS.gunmetalColor} style={GlobalStyles.mr10} />
              <Paragraph h5 title={`Add ${text ?? ''} as new industry`} style={styles.textBtnAdd} />
            </TouchableOpacity>
          </View>
          <View style={styles.selectedContainer}>
            {selected && selected.length > 0 && (
              <View style={styles.tagContainer}>
                {selected.map((item: string, index: number) => (
                  <Category
                    key={`selected-${index}`}
                    itemKey={`${index}`}
                    name={item}
                    showButton={true}
                    onPress={() => onRemove(item)}
                  />
                ))}
              </View>
            )}
            <View style={[GlobalStyles.mt10, GlobalStyles.alignCenter]}>
              <Paragraph
                h5
                textIndianRedColor
                title={warningIndustryAmount ? 'You can only select 6 industries' : ''}
              />
            </View>
            <ButtonSecond
              title='Done'
              buttonContainerStyle={styles.btnDone}
              titleStyle={styles.titleStyle}
              onPress={() => handleSave(selected)}
              showIcon={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalDialog;
