/* eslint-disable import/no-extraneous-dependencies, global-require */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  corePlugins: {
    container: false,
  },
  theme: {
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'Plus Jakarta Sans Fallback', ...defaultTheme.fontFamily.sans],
      mono: ['Space Grotesk', 'Space Grotesk Fallback', ...defaultTheme.fontFamily.mono],
      'mono-ibm': ['IBM Plex Mono', ...defaultTheme.fontFamily.mono],
    },
    fontSize: {
      xs: ['12px'],
      sm: ['14px'],
      base: ['16px'],
      md: ['18px'],
      lg: ['20px'],
      xl: ['24px'],
      '2xl': ['28px'],
      '3xl': ['30px'],
      '4xl': ['36px'],
      '5xl': ['40px'],
      '6xl': ['52px'],
      '7xl': ['64px'],
      '8xl': ['72px'],
    },
    colors: ({ colors }) => ({
      inherit: colors.inherit,
      current: colors.current,
      transparent: colors.transparent,
      black: '#0B0B0E',
      white: '#FFFFFF',
      red: '#FF3333',
      'blue-super-light': '#99CCFF',
      'blue-light': '#0066F5',
      'blue-lighter': '#006AFF',
      'blue-light-hover': '#005CDB',
      'blue-dark': '#198CFF',
      grey: {
        15: '#242429',
        25: '#3B3B44',
        40: '#61616B',
        50: '#797986',
        60: '#94949E',
        70: '#AFAFB6',
        80: '#C9C9CF',
        88: '#DFDFE2',
        96: '#F4F4F5',
        98: '#FAFAFA',
      },
      code: {
        blue: '#66CCFF',
        pink: '#FF4CE1',
        yellow: '#F5FF7D',
        green: '#3DF57A',
      },
      admonition: {
        warning: '#FF4D88',
        info: '#4DA6FF',
        'note-light': '#94949E',
        'note-dark': '#AFAFB6',
        'caution-light': '#F5B83D',
        'caution-dark': '#F6C155',
        'tip-light': '#4D4DFF',
        'tip-dark': '#7070FF',
      },
    }),
    extend: {
      spacing: {
        4.5: '1.125rem', // 18px
      },
      content: {
        externalIconLight: "url('icons/external-link-light.svg')",
        externalIconLightHover: "url('icons/external-link-light-hover.svg')",
        externalIconDark: "url('icons/external-link-dark.svg')",
      },
      backgroundImage: {
        'close-light': "url('components/shared/search/input/images/close-light.svg')",
        'close-dark': "url('components/shared/search/input/images/close-dark.svg')",
      },
      boxShadow: {
        select: '0px 0px 6px rgba(0, 0, 0, 0.1)',
      },
      opacity: {
        16: '.16',
      },
    },
    screens: {
      '2xl': { max: '1919px' },
      xl: { max: '1535px' },
      lg: { max: '1279px' },
      md: { max: '1023px' },
      sm: { max: '767px' },
      xs: { max: '359px' },
    },
  },
  plugins: [
    require('tailwindcss-safe-area'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
