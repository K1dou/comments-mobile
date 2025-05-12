import { createTamagui } from 'tamagui';
import { config as baseConfig } from '@tamagui/config';

const config = createTamagui({
  ...baseConfig,
  fontLanguages: {},
});

export type Conf = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
