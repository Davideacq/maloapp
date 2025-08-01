// Avatar component for React Native
import React, { useState } from 'react';
import { Image, ImageStyle, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  fallback?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

// Funzione per generare un colore basato sul nome
const generateColorFromName = (name: string): string => {
  const colors = [
    '#3b82f6', // blue
    '#14b8a6', // teal
    '#22c55e', // green
    '#f97316', // orange
    '#ef4444', // red
    '#8b5cf6', // purple
    '#06b6d4', // cyan
    '#f59e0b', // amber
    '#ec4899', // pink
    '#10b981', // emerald
  ];
  
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  return colors[Math.abs(hash) % colors.length];
};

// Funzione per ottenere le iniziali da un nome
const getInitials = (name: string): string => {
  if (!name || name.trim().length === 0) return '?';
  
  const parts = name.trim().split(' ');
  if (parts.length === 1) {
    return parts[0].charAt(0).toUpperCase();
  }
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  style,
  imageStyle,
  fallback,
  variant = 'default',
}) => {
  const [imageError, setImageError] = useState(false);
  
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

  const getVariantColor = (): string => {
    if (variant !== 'default') {
      const variantColors = {
        primary: '#3b82f6',
        secondary: '#6b7280',
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
      };
      return variantColors[variant];
    }
    
    // Se è default, genera colore basato sul nome
    const name = alt || fallback || '';
    return generateColorFromName(name);
  };

  const sizeConfig = getSizeStyles();
  const hasImage = src && src.length > 0 && !imageError;
  const fallbackText = fallback || getInitials(alt || '');

  const handleImageError = () => {
    setImageError(true);
  };

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
          onError={handleImageError}
        />
      ) : (
        <View
          style={[
            styles.fallback,
            {
              width: sizeConfig.width,
              height: sizeConfig.height,
              backgroundColor: getVariantColor(),
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
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  fallbackText: {
    color: 'white',
    fontWeight: '600',
  },
}); 