import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

const iconMap: Record<string, any> = {
  // check: require('../../dist/assets/images/check.png'), // non esiste
  // bell: require('../../dist/assets/images/bell.png'), // non esiste
  // eye: require('../../dist/assets/images/eye.png'), // non esiste
  // 'eye-off': require('../../dist/assets/images/eye-off.png'), // non esiste
  // 'arrow-left': require('../../dist/assets/images/arrow-left.png'), // non esiste
  // home: require('../../dist/assets/images/home.png'), // non esiste
  // settings: require('../../dist/assets/images/settings.png'), // non esiste
  // user: require('../../dist/assets/images/user.png'), // non esiste
  // 'book-open': require('../../dist/assets/images/book-open.png'), // non esiste
  // Se vuoi aggiungere icone, mettile in assets/images e aggiorna qui i path
};

interface AppIconProps {
  name: keyof typeof iconMap;
  size?: number;
  style?: StyleProp<ImageStyle>;
  tintColor?: string;
  [key: string]: any;
}

export const AppIcon: React.FC<AppIconProps> = ({ name, size = 24, style, tintColor, ...rest }) => {
  const source = iconMap[name];
  if (!source) return null;
  return (
    <Image
      source={source}
      style={[{ width: size, height: size, tintColor }, style]}
      resizeMode="contain"
      {...rest}
    />
  );
}; 