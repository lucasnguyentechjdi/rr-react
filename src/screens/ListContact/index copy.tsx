/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, {useState, useEffect} from 'react';
import {View, SectionList, PermissionsAndroid, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Contacts from 'react-native-contacts';

import {RootNavigatorParamsList} from '~Root/navigation/config';

import {AppRoute} from '~Root/navigation/AppRoute';
import {Paragraph, HeaderSmallBlue} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.VERIFY_EMAIL>;
interface RowItem {
  id: string;
  name: string;
  phoneNumber?: string;
  email?: string;
}

interface IContacts {
  key: string;
  data: RowItem[];
}

const ListContactScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState<IContacts>();

  const onBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setLoading(true);
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      }).then(() => {
        loadContacts();
      });
    } else {
      loadContacts();
    }
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then((response: any) => {
        const re = response.sort((a: any, b: any) =>
          a.givenName.localeCompare(b.givenName, 'es', {sensitivity: 'base'}),
        );
        console.log('re===========', re);
        const trimmedContacts: any = re.reduce((r: any, e: any) => {
          // get first letter of name of current element
          const alphabet = e.givenName[0];

          if (!r[alphabet]) {
            r[alphabet] = {alphabet, data: [e]};
          } else {
            r[alphabet].data.push(e);
          }
          return r;
        }, {});
        console.log('trimmedContacts=======', Object.values(trimmedContacts));
        setContacts(Object.values(trimmedContacts));
        setLoading(false);
      })
      .catch(e => {
        console.log(`Error: ${e}`);
        setLoading(false);
      });

    Contacts.checkPermission();
  };

  if (loading || !contacts) {
    return null;
  }
  console.log('response=====', contacts);
  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderSmallBlue onBack={onBack} isBackButton={true} title={`${t('invite_into')} ${t('trust_network')}`} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <View style={GlobalStyles.container}>
          <SectionList
            sections={contacts}
            renderItem={({item}: any) => (
              <View style={styles.row}>
                <Paragraph h5 title={`${item?.givenName} ${item?.familyName}`} />
              </View>
            )}
            renderSectionHeader={({section}) => <Paragraph bold h5 title={section.alphabet} style={styles.header} />}
            keyExtractor={(item, index) => `listContact-${index}`}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ListContactScreen;
