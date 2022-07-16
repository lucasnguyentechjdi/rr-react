import React, {useState, useEffect, useRef, useCallback} from 'react';
import {View, PermissionsAndroid, Platform, TouchableOpacity, FlatList, Text, TextInput} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Contacts from 'react-native-contacts';
import {useDispatch, useSelector} from 'react-redux';

import {RootNavigatorParamsList} from '~Root/navigation/config';

import {AppRoute} from '~Root/navigation/AppRoute';
import {Paragraph, HeaderSmallBlue, Icon} from '~Root/components';
import {IGlobalState} from '~Root/types';
import {RowItem} from '~Root/services/contact/types';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import styles from './styles';
import {setContact, setContactSelected} from '~Root/services/contact/actions';
import BigList from 'react-native-big-list';
import debounce from 'lodash.debounce';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LIST_CONTACT>;

const ListContactScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {contacts} = useSelector((state: IGlobalState) => state.contactState);
  const [data, setData] = useState<RowItem[][]>([]);
  const [sideFilter, setSideFilter] = useState<string[]>([]);
  const [textSearch, setTextSearch] = useState('');
  const scrollRef = useRef<any>(null);

  const onBack = () => {
    navigation.goBack();
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceSearch = useCallback(
    debounce((nextValue: string) => searchData(nextValue), 500),
    [],
  );

  const onInputChange = (text: string) => {
    setTextSearch(text);
    debounceSearch(text);
  };

  const searchData = (search: string) => {
    try {
      const data: RowItem[][] = [];
      const alpha: any[] = [];
      const text = search.toLowerCase();
      contacts.forEach(item => {
        const filter = item.data.filter(item => {
          if (item.name.toLowerCase().includes(text)) return true;
          if (item.email?.toLowerCase().includes(text)) return true;
          if (item.phoneNumber?.toLowerCase().includes(text)) return true;
          return false;
        });
        if (filter.length > 0) {
          alpha.push(item.alphabet);
        }
        data.push(filter);
      });
      setSideFilter(alpha);
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      })
        .then(() => {
          loadContacts();
        })
        .catch(() => console.log('Not have permission'));
    } else {
      loadContacts();
    }
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then((response: any[]) => {
        dispatch(
          setContact(response, () => {
            console.log(123);
          }),
        );
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });

    Contacts.checkPermission().catch(e => {
      console.log(e);
    });
  };

  const onSelect = (item: RowItem) => {
    dispatch(
      setContactSelected(item, () => {
        navigation.navigate(AppRoute.INVITE_CONTACT);
      }),
    );
  };

  const contactHeader = (index: number): string => {
    if (contacts[index]) return contacts[index].alphabet;
    return index.toString();
  };

  const onChangeSection = (item: string) => {
    const index = sideFilter.indexOf(item);
    if (!scrollRef.current) return;
    const offset = scrollRef.current?.getItemOffset({index: 0, section: index});
    scrollRef.current?.scrollToOffset({offset: offset - 140, animated: true});
  };

  useEffect(() => {
    const data: RowItem[][] = [];
    setSideFilter(contacts.map(item => item.alphabet));
    contacts.forEach(item => {
      data.push(item.data);
    });
    setData(data);
  }, [contacts]);

  if (loading) {
    return null;
  }

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderSmallBlue onBack={onBack} isBackButton={true} title={`${t('invite_into')} ${t('trust_network')}`} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <View style={GlobalStyles.container}>
          <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
              <Icon name='search' color={BASE_COLORS.eerieBlackColor} size={20} style={styles.iconSearch} />
              <TextInput placeholder='Search' value={textSearch} style={styles.input} onChangeText={onInputChange} />
            </View>
          </View>
          {data && (
            <BigList
              ref={scrollRef}
              sections={data}
              itemHeight={50}
              headerHeight={90}
              footerHeight={100}
              sectionHeaderHeight={40}
              renderSectionHeader={section => (
                <Paragraph bold h5 title={contactHeader(section)} style={styles.header} />
              )}
              renderItem={({item}: {item: RowItem}) => (
                <TouchableOpacity style={styles.row} onPress={() => onSelect(item)}>
                  <Paragraph h5 title={item?.name} />
                  {item.email ? <Text style={styles.emailText}>{item?.email ?? ''}</Text> : <></>}
                </TouchableOpacity>
              )}
            />
          )}
          <FlatList
            data={sideFilter}
            renderItem={({item}: {item: string}) => (
              <TouchableOpacity onPress={() => onChangeSection(item)}>
                <Paragraph textCenter bold style={styles.sideFilterText} title={item} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            style={styles.sideFilter}
          />
          {/* <SectionList
            sections={contacts}
            renderItem={({item}: {item: RowItem}) => (
              <TouchableOpacity style={styles.row} onPress={() => onSelect(item)}>
                <Paragraph h5 title={item?.name} />
              </TouchableOpacity>
            )}
            renderSectionHeader={({section}) => <Paragraph bold h5 title={section.alphabet} style={styles.header} />}
            keyExtractor={(item, index) => `listContact-${index}`}
          /> */}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ListContactScreen;
