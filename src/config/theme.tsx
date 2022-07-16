export const BASE_COLORS = {
  primary: '#3D75C9',
  greenColor: '#00AD4B',
  whiteColor: '#FEFEFE',
  blackColor: '#000000',
  blackTransparent: 'rgba(0, 0, 0, 0.5)',
  eerieBlackColor: '#1C1D1E',
  lightBlackColor: '#321F36',
  secondary: '#C7C7CC',
  tertiary: '#CCCCCC',
  card: '#F5F5F5',
  grayColor: '#9B9B9B',
  gray90Color: '#E5E5E5',
  grayX11Color: '#BCBCBC',
  lighGray: '#EEEEEE',
  greyBlue: "#E9EDF2",
  greyColor: '#C4C4C4',
  darkGray: '#A9A9A9',
  redColor: '#FF5555',
  lightPinkColor: 'rgba(50, 31, 54, 0.5)',
  approxIndigoColor: '#AB80B3',
  tealBlueColor: '#38698B',
  steelBlueColor: '#4683AE',
  aeroColor: '#73C6E7',
  oxleyColor: '#679C79',
  buffColor: '#F6E186',
  seaSerpentColor: '#56C6D1',
  giantsOrangeColor: '#FF4B26',
  gunmetalColor: '#283332',
  indianRedColor: '#D16156',
  spanishGrayColor: '#939393',
  davysGreyColor: '#555555',
  morningBlueColor: '#8C979A',
  antiFlashWhiteColor: '#F0F0F0',
  culturedColor: '#F7F8F9',
  oldSilverColor: '#848383',
  forestGreenColor: '#034B1A',
  timberWolfColor: '#DFD9D4',
  brightGray: '#E5EFF6',
  steelBlue: '#347FAD',
  lightBlue: '#E5EFF7',
  gray: '#7A8088',
  lightGray: '#DEDEDE',
  lavenderGray: "#BDC3CB",
};

export const BASE_FONTS = {
  bold: 'Montserrat-Bold',
  semiBold: 'Montserrat-SemiBold',
  regular: 'Montserrat-Regular',
  medium: 'Montserrat-Medium',
  notoSanRegular: 'NotoSans-Regular',
  notoSanSemiBold: 'NotoSans-SemiBold',
};

export const BASE_STYLES = {
  h1: 32,
  h2: 24,
  h3: 18,
  h4: 16,
  h5: 14,
  p: 12,
};

export const VIEW_MODE = {
  block: 'block',
  list: 'list',
};

export const ThemeSupport = [
  {
    theme: 'steelBlue',
    light: {
      dark: false,
      colors: {
        primary: '#4683AE',
        secondary: '#73C6E7',
        whiteColor: 'white',
        oxleyColor: '#679C79',
        buffColor: '#F6E186',
        eerieBlackColor: '#1C1D1E',
        indianRedColor: '#56C6D1',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#E5634D',
        primaryDark: '#C31C0D',
        primaryLight: '#FF8A65',
        accent: '#4A90A4',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },

  {
    theme: 'blue',
    light: {
      dark: false,
      colors: {
        primary: '#5DADE2',
        primaryDark: '#1281ac',
        primaryLight: '#68c9ef',
        accent: '#FF8A65',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#5DADE2',
        primaryDark: '#1281ac',
        primaryLight: '#68c9ef',
        accent: '#FF8A65',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
  {
    theme: 'green',
    light: {
      dark: false,
      colors: {
        primary: '#58D68D',
        primaryDark: '#388E3C',
        primaryLight: '#C8E6C9',
        accent: '#607D8B',
        background: 'white',
        card: '#F5F5F5',
        text: '#212121',
        border: '#c7c7cc',
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: '#58D68D',
        primaryDark: '#388E3C',
        primaryLight: '#C8E6C9',
        accent: '#607D8B',
        background: '#010101',
        card: '#121212',
        text: '#e5e5e7',
        border: '#272729',
      },
    },
  },
];

export const DefaultTheme = {
  theme: 'steelBlue',
  light: {
    dark: false,
    colors: {
      primary: '#4683AE',
      secondary: '#73C6E7',
      whiteColor: 'white',
      oxleyColor: '#679C79',
      buffColor: '#F6E186',
      eerieBlackColor: '#1C1D1E',
      indianRedColor: '#56C6D1',
    },
  },
  dark: {
    dark: true,
    colors: {
      primary: '#E5634D',
      primaryDark: '#C31C0D',
      primaryLight: '#FF8A65',
      accent: '#4A90A4',
      background: '#010101',
      card: '#121212',
      text: '#e5e5e7',
      border: '#272729',
    },
  },
};
