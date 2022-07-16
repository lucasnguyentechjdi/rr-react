import * as yup from 'yup';

import { BASE_COLORS, GlobalStyles, MESSAGE, REGISTER_FIELDS, REGISTER_KEYS } from '~Root/config';
import {
    Button,
    Icon,
    Paragraph,
} from '~Root/components';
import { adjust, buildShareLink } from '~Root/utils';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppRoute } from '~Root/navigation/AppRoute';
import { RootNavigatorParamsList } from '~Root/navigation/config';
import styles from "./styles"
type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LOGIN>;
const PrivacyScreen = ({ navigation, route }: Props) => {
    const { type } = route.params;
    const handelRegister = () => {
        navigation.navigate(AppRoute.INVITE_CODE);
    }
    const onBack = () => {
        navigation.goBack();
    }
    return (
        <View style={[GlobalStyles.container, styles.container]}>
            <ScrollView
                style={[GlobalStyles.scrollViewWhite, GlobalStyles.mb0]}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                {type !== "register" ?
                    <TouchableOpacity onPress={onBack} style={[GlobalStyles.pl10]}>
                        <Icon
                            name='angle-left'
                            size={adjust(15)}
                            color={BASE_COLORS.blackColor}
                        />
                    </TouchableOpacity>
                    :
                    <></>
                }

                <View style={[GlobalStyles.p10, GlobalStyles.pr5, styles.container]}>
                    <Paragraph h3 textBlack title='Privacy Policy' bold600 style={[GlobalStyles.mb10]} />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title='ReferReach Pte. Ltd. built the ReferReach app as a Free app. This SERVICE is provided by ReferReach Pte. Ltd. at no cost and is intended for use as is.' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title='This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title='If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.' />
                    <Paragraph style={[GlobalStyles.mb10]} bold p textBlack title='Information Collection and Use' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title='For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Name, email address. The information that we request will be retained by us and used as described in this privacy policy.' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title='The app does use third-party services that may collect information used to identify you' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title='Link to the privacy policy of third-party service providers used by the app' />
                    <Paragraph style={[GlobalStyles.textJustify, styles.p]} p textBlack title={`\u2022` + ' Google Play Services'} />
                    <Paragraph style={[GlobalStyles.textJustify, styles.p]} p textBlack title={`\u2022` + ' Google Analytics for Firebase'} />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`\u2022` + ' Flurry Analytics'} />
                    <Paragraph style={[GlobalStyles.mb10]} bold p textBlack title='Log Data' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title='We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.' />
                    <Paragraph style={[GlobalStyles.mb10]} bold p textBlack title='Cookies' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.`} />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.`} />
                    <Paragraph style={[GlobalStyles.mb10]} bold p textBlack title='Service Providers' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`We may employ third-party companies and individuals due to the following reasons:`} />
                    <Paragraph style={[GlobalStyles.textJustify, styles.p]} p textBlack title={`\u2022` + ' To facilitate our Service;'} />
                    <Paragraph style={[GlobalStyles.textJustify, styles.p]} p textBlack title={`\u2022` + ' To provide the Service on our behalf;'} />
                    <Paragraph style={[GlobalStyles.textJustify, styles.p]} p textBlack title={`\u2022` + ' To perform Service-related services; or'} />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`\u2022` + ' To assist us in analyzing how our Service is used.'} />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.`} />
                    <Paragraph style={[GlobalStyles.mb10]} bold p textBlack title='Security' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.`} />
                    <Paragraph style={[GlobalStyles.mb10]} bold p textBlack title='Links to Other Sites' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.`} />
                    <Paragraph style={[GlobalStyles.mb10]} bold p textBlack title='Children’s Privacy' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.`} />
                    <Paragraph style={[GlobalStyles.mb10]} bold p textBlack title='Changes to This Privacy Policy' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.`} />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`This policy is effective as of 2022-06-28`} />
                    <Paragraph style={[GlobalStyles.mb10]} bold p textBlack title='Contact Us' />
                    <Paragraph style={[GlobalStyles.mb10, GlobalStyles.textJustify, styles.p]} p textBlack title={`If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at robin@referreach.com.`} />
                </View>
            </ScrollView>
            {type === "register" ?
                <View style={[GlobalStyles.flexRow, GlobalStyles.pt20, GlobalStyles.pb20, styles.buttonContainer]}>
                    <Button
                        title='I decline'
                        h3
                        textCenter
                        bordered
                        onPress={onBack}
                        containerStyle={{ ...GlobalStyles.buttonContainerStyle, ...styles.buttonDeclineStyle }}
                        textStyle={styles.h3BoldDecline}
                    />
                    <Button
                        title='I accept'
                        h3
                        textCenter
                        bordered
                        onPress={handelRegister}
                        containerStyle={{ ...GlobalStyles.buttonContainerStyle, ...styles.buttonAcceptStyle }}
                        textStyle={styles.h3BoldDefault}
                    />
                </View>
                :
                <></>
            }
        </View>
    )
}
export default PrivacyScreen;