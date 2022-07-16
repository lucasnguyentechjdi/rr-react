import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeTemplateScreen, Loading } from '~Root/components';
import { GlobalStyles, IMAGES } from '~Root/config';
import { getAskDropDown, setAskSelected } from '~Root/services/ask/actions';
import { getUserAskData, getUserInviteData, getUserNetworkData } from '~Root/services/user/actions';

import messaging from '@react-native-firebase/messaging';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { AppRoute } from '~Root/navigation/AppRoute';
import { MainNavigatorParamsList } from '~Root/navigation/config';
import { IAsk } from '~Root/services/ask/types';
import { IAuthState } from '~Root/services/auth/types';
import { IUserState } from '~Root/services/user/types';
import { IGlobalState } from '~Root/types';
import Ask from './Ask';

type Props = NativeStackScreenProps<MainNavigatorParamsList, AppRoute.YOUR_ASKS>;

const YourAsksScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch();
    const authState: IAuthState = useSelector((state: IGlobalState) => state.authState);
    const userState: IUserState = useSelector((state: IGlobalState) => state.userState);
    const [loading, setLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const { t } = useTranslation();
    let isScroll = false;

    const subscribeTopic = () => {
        if (!userState.userInfo) return;
        void messaging()
            .subscribeToTopic(userState.userInfo.code)
            .then(() => console.log('Subscribed to topic!', userState.userInfo.code));
    };

    useEffect(() => {
        if (authState?.isLoggedIn && userState?.userInfo?.profileCompleted) {
            dispatch(getUserInviteData());
            dispatch(getUserNetworkData());
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

    const onAsk = () => {
        dispatch(setAskSelected(null));
        navigation.navigate(AppRoute.CREATE_ASK);
    };

    const onAskItemClick = (item: IAsk) => {
        if (isScroll) return;
        dispatch(setAskSelected(item));
        navigation.navigate(AppRoute.HOME_DETAIL, {});
    };

    const onTooltipPress = () => {
        setShowTooltip((prevState: boolean) => !prevState);
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
            <Ask
                tabLabel={IMAGES.iconSound}
                contentProps={{
                    askState: userState.asks,
                    onPress: onAsk,
                    showTooltip,
                    onTooltipPress: onTooltipPress,
                    onItemClick: onAskItemClick,
                }}
            />
        </HomeTemplateScreen>
    );
};

export default YourAsksScreen;
