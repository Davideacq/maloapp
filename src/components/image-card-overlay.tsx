import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useScreenSize } from '../hooks/use-screen-size';

export interface ImageCardOverlayProps {
  image: ImageSourcePropType;
  title: string;
  subtitle?: string;
  buttonText?: string;
  onButtonPress?: () => void;
  style?: ViewStyle;
}

const ImageCardOverlay: React.FC<ImageCardOverlayProps> = ({ 
  image, 
  title, 
  subtitle, 
  buttonText,
  onButtonPress,
  style 
}) => {
  const { isSmallScreen } = useScreenSize();

  if (isSmallScreen) {
    // Layout mobile: immagine sopra, testo e bottone sotto
    return (
      <View style={[styles.mobileContainer, style]}>
        <View style={styles.mobileImageContainer}>
          <Image source={image} style={styles.mobileImage} resizeMode="cover" />
        </View>
        <View style={styles.mobileContent}>
          <Text style={styles.mobileTitle}>{title}</Text>
          {subtitle && <Text style={styles.mobileSubtitle}>{subtitle}</Text>}
          {buttonText && onButtonPress && (
            <Pressable style={styles.mobileButton} onPress={onButtonPress}>
              <View style={styles.buttonContent}>
                <Text style={styles.mobileButtonText}>{buttonText}</Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </View>
            </Pressable>
          )}
        </View>
      </View>
    );
  }

  // Layout desktop: overlay sull'immagine
  return (
    <View style={[
      styles.container, 
      style
    ]}>
      <Image source={image} style={styles.backgroundImage} resizeMode="cover" />
      <LinearGradient
        colors={['transparent', 'rgba(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.9)']}
        locations={[0, 0.3, 0.7, 1]}
        style={styles.overlay}
      >
        <View style={[
          styles.overlayContent,
          styles.overlayContentHorizontal
        ]}>
          <View style={[
            styles.textContent,
            styles.textContentHorizontal
          ]}>
            <Text style={[
              styles.title,
              styles.titleLarge
            ]}>{title}</Text>
            {subtitle && <Text style={[
              styles.subtitle,
              styles.subtitleLarge
            ]}>{subtitle}</Text>}
          </View>
          {buttonText && onButtonPress && (
            <Pressable 
              style={[
                styles.button,
                styles.buttonHorizontal
              ]} 
              onPress={onButtonPress}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>{buttonText}</Text>
                <Ionicons name="arrow-forward" size={16} color="white" />
              </View>
            </Pressable>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  // Mobile layout styles
  mobileContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mobileImageContainer: {
    aspectRatio: 2 / 1,
    overflow: 'hidden',
  },
  mobileImage: {
    width: '100%',
    height: '100%',
  },
  mobileContent: {
    padding: 16,
    gap: 12,
  },
  mobileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937', // text-100
    lineHeight: 24,
  },
  mobileSubtitle: {
    fontSize: 14,
    color: '#6b7280', // text-60
    lineHeight: 20,
  },
  mobileButton: {
    backgroundColor: '#14b8a6', // teal-500
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
  },
  mobileButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },

  // Desktop layout styles (existing)
  container: {
    flex: 1,
    aspectRatio: 2 / 1, // Sempre 2:1 su tutti i breakpoint
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 120,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '30%',
    justifyContent: 'flex-end',
  },
  overlayContent: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    zIndex: 2,
  },
  overlayContentHorizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  textContent: {
    // Base styles
  },
  textContentHorizontal: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  titleLarge: {
    fontSize: 20,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  subtitleLarge: {
    fontSize: 14,
  },
  button: {
    backgroundColor: '#14b8a6', // teal-500
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonHorizontal: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minWidth: 80,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export { ImageCardOverlay };
