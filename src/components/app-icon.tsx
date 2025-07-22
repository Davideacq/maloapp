import React from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';

const iconMap: Record<string, any> = {
  check: require('../../assets/images/check.png'),
  bell: require('../../assets/images/bell.png'),
  eye: require('../../assets/images/eye.png'),
  'eye-off': require('../../assets/images/eye-off.png'),
  'arrow-left': require('../../assets/images/arrow-left.png'),
  home: require('../../assets/images/home.png'),
  settings: require('../../assets/images/settings.png'),
  user: require('../../assets/images/user.png'),
  'book-open': require('../../assets/images/book-open.png'),
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