import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeTemplateScreen, Loading } from '~Root/components';
import { GlobalStyles, IMAGES } from '~Root/config';
import { getAskDropDown } from '~Root/services/ask/actions';
import { getUserAskData, getUserInviteData, getUserNetworkData } from '~Root/services/user/actions';

import messaging from '@react-native-firebase/messaging';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';
import { AppRoute } from '~Root/navigation/AppRoute';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import { IAuthState } from '~Root/services/auth/types';
import { IUserState } from '~Root/services/user/types';
import { IGlobalState } from '~Root/types';
import TrustNetwork from './TrustNetwork';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.TRUST>;

const TrustScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const authState: IAuthState = useSelector((state: IGlobalState) => state.authState);
    const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
    const [loading, setLoading] = useState(false);
    const [showTooltipTrustNetwork, setShowTooltipTrustNetwork] = useState(false);
    const { t } = useTranslation();

    const subscribeTopic = () => {
        if (!userState.userInfo) return;
        void messaging()
            .subscribeToTopic(userState.userInfo.code)
            .then(() => console.log('Subscribed to topic!', userState.userInfo.code));
    };

    useEffect(() => {
        if (authState?.isLoggedIn && userState?.userInfo?.profileCompleted) {
            dispatch(getUserInviteData());
            dispatch(getUserNetworkData(userState.userInfo?.isSuggest));
            const page = userState?.askPagination?.pageCurrent ?? 1;
            const limit = userState?.askPagination?.recordPerPage ?? 50;
            dispatch(getUserAskData(page, limit));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, navigation, authState.isLoggedIn]);

    useEffect(() => {
        subscribeTopic();
        dispatch(getAskDropDown());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState.userInfo]);

    const onBack = () => {
        navigation.goBack();
    };

    const onProfile = () => {
        navigation.navigate(AppRoute.PROFILE);
    };

    const onEdit = () => {
        navigation.navigate(AppRoute.PROFILE);
    };

    const onInvite = () => {
        if (!checkInviteLeft()) {
            Toast.show({
                position: 'bottom',
                type: 'error',
                text1: t('notify_full_trust_network'),
                visibilityTime: 2000,
                autoHide: true,
            });
            return;
        }
        navigation.navigate(AppRoute.INVITE_CONTACT);
    };

    const onTooltipTrustNetWorkPress = () => {
        console.log('run');
        setShowTooltipTrustNetwork((prevState: boolean) => !prevState);
    };

    const checkInviteLeft = () => {
        if (userState.invites.length >= userState.userInfo.inviteMax) {
            return 0;
        }
        return userState.userInfo.inviteMax - userState.invites.length;
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <HomeTemplateScreen
            onBack={onBack}
            onProfile={onProfile}
            onEdit={onEdit}
            containerHeaderStyle={GlobalStyles.containerHeaderStyle}
            profile={userState?.userInfo}
            showLogout={false}
            isBackButton={false}>
            <TrustNetwork
                tabLabel={IMAGES.iconShield}
                contentProps={{
                    invitesLeft: checkInviteLeft(),
                    invokeInvite: userState?.invokeInvite,
                    onPress: onInvite,
                    showTooltip: showTooltipTrustNetwork,
                    onTooltipPress: onTooltipTrustNetWorkPress,
                    navigation: navigation,
                }}
            />
        </HomeTemplateScreen>
    );
};

export default TrustScreen;
