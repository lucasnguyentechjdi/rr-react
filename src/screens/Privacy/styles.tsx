import { StyleSheet } from 'react-native';
import { BASE_COLORS, BASE_FONTS, GlobalStyles, BASE_STYLES } from '~Root/config';
import { adjust, lineHeightByRatio } from '~Root/utils';
export default StyleSheet.create({
    container: {
        backgroundColor: BASE_COLORS.whiteColor,
    },
    p:{
        fontSize: 15
    },
    h3BoldDefault: {
        fontFamily: BASE_FONTS.semiBold,
        fontWeight: '600',
        lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
        color: BASE_COLORS.whiteColor,
        fontSize: 14
    },
    h3BoldDecline: {
        fontFamily: BASE_FONTS.semiBold,
        fontWeight: '600',
        lineHeight: lineHeightByRatio(adjust(BASE_STYLES.h3)),
        color: BASE_COLORS.oxleyColor,
        fontSize: 14
    },
    buttonAcceptStyle: {
        alignSelf: 'center',
        backgroundColor: BASE_COLORS.oxleyColor,
        borderRadius: 50,
        margin: 5
    },
    buttonDeclineStyle: {
        alignSelf: 'center',
        backgroundColor: BASE_COLORS.greyBlue,
        borderRadius: 50,
        margin: 5,
        borderColor: BASE_COLORS.oxleyColor,
        borderWidth: 2
    },
    buttonContainer: {
        backgroundColor: BASE_COLORS.greyBlue,
        alignItems: 'center',
        justifyContent: 'center'
    }
})