// Avatar component for React Native
import React from 'react';
import { Image, ImageStyle, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  style,
  imageStyle,
  fallback,
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return { width: 32, height: 32, fontSize: 12 };
      case 'lg':
        return { width: 64, height: 64, fontSize: 20 };
      case 'xl':
        return { width: 96, height: 96, fontSize: 32 };
      default:
        return { width: 48, height: 48, fontSize: 16 };
    }
  };

  const sizeConfig = getSizeStyles();
  const hasImage = src && src.length > 0;
  const fallbackText = fallback || (alt ? alt.charAt(0).toUpperCase() : '?');

  return (
    <View
      style={[
        styles.container,
        {
          width: sizeConfig.width,
          height: sizeConfig.height,
        },
        style,
      ]}
    >
      {hasImage ? (
        <Image
          source={{ uri: src }}
          style={[
            styles.image,
            {
              width: sizeConfig.width,
              height: sizeConfig.height,
            },
            imageStyle,
          ]}
          accessibilityLabel={alt}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: sizeConfig.width,
              height: sizeConfig.height,
            },
          ]}
        >
          <Text
            style={[
              styles.fallbackText,
              {
                fontSize: sizeConfig.fontSize,
              },
            ]}
          >
            {fallbackText}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 50,
  },
  fallback: {
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  fallbackText: {
    color: 'white',
    fontWeight: '600',
  },
}); 