import { createFont, createTamagui } from 'tamagui';
import { config as baseConfig } from '@tamagui/config';

const rubikFont = createFont({
  family: 'Rubik',
  size: {
    4: 16,
    5: 20,
    6: 24,
  },
  weight: {
    4: '400',
    7: '700',
  },
  lineHeight: {
    4: 22,
    5: 26,
    6: 32,
  },
});

const config = createTamagui({
  ...baseConfig,
  fonts: {
    ...baseConfig.fonts,
    body: rubikFont,
    heading: rubikFont,
  },
  tokens: {
    ...baseConfig.tokens,
    color: {
      ...baseConfig.tokens.color,
      white: '#fff',
      black: '#000',
      pink: '#ED6468',
    },
  },
});

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
