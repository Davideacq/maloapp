import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useScreenSize } from '../hooks/use-screen-size';
import { ImageCardOverlay, ImageCardOverlayProps } from './image-card-overlay';

export interface ImageCardCarouselProps {
  cards: ImageCardOverlayProps[];
  style?: ViewStyle;
}

const ImageCardCarousel: React.FC<ImageCardCarouselProps> = ({ cards, style }) => {
  const { isSmallScreen } = useScreenSize();

  // Stato per il dot attivo
  const [activeIndex, setActiveIndex] = useState(0);

  if (isSmallScreen) {
    // Layout mobile: testo sopra, immagine sotto, dot indicator
    return (
      <View style={[styles.carouselMobileContainer, style]}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.carouselContainer}
          style={styles.carousel}
          onScroll={e => {
            const index = Math.round(
              e.nativeEvent.contentOffset.x /
              e.nativeEvent.layoutMeasurement.width
            );
            setActiveIndex(index);
          }}
          scrollEventThrottle={16}
        >
          {cards.map((cardProps, index) => (
            <View key={index} style={styles.carouselCardMobile}>
              {/* Estraggo title, subtitle, buttonText, onButtonPress, image */}
              <View style={styles.mobileCardContentBox}>
                <Text style={styles.mobileTitle}>{cardProps.title}</Text>
                {cardProps.subtitle && <Text style={styles.mobileSubtitle}>{cardProps.subtitle}</Text>}
                {cardProps.buttonText && cardProps.onButtonPress && (
                  <Pressable style={styles.mobileButton} onPress={cardProps.onButtonPress}>
                    <Text style={styles.mobileButtonText}>{cardProps.buttonText}</Text>
                  </Pressable>
                )}
              </View>
              <View style={styles.mobileImageBox}>
                <Image source={cardProps.image} style={styles.mobileImage} resizeMode="cover" />
              </View>
            </View>
          ))}
        </ScrollView>
        {/* Dot indicator */}
        <View style={styles.dotsContainer}>
          {cards.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                idx === activeIndex ? styles.dotActive : styles.dotInactive
              ]}
            />
          ))}
        </View>
      </View>
    );
  }

  // Layout normale per schermi grandi
  return (
    <View style={[styles.gridContainer, style]}>
      {cards.map((cardProps, index) => (
        <ImageCardOverlay
          key={index}
          {...cardProps}
          style={styles.largeScreenCard}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    marginBottom: 32,
  },
  carouselContainer: {
    paddingHorizontal: 0, // Rimuovo il padding per schermi piccoli
    gap: 0, // Rimuovo il gap per schermi piccoli
  },
  carouselCard: {
    // marginRight is now handled in multipleCard
  },
  gridContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  smallScreenCard: {
    aspectRatio: 2 / 1, // 2:1 anche per schermi piccoli
    minHeight: 120,
  },
  largeScreenCard: {
    flex: 1,
    aspectRatio: 2 / 1, // 2:1 per schermi grandi
    minHeight: 120,
  },
  singleCard: {
    width: '85vw',
    maxWidth: 400,
  },
  multipleCard: {
    width: '85vw', // Card width for mobile slider
    maxWidth: 400,
    marginRight: 16, // Spacing between cards
  },
  carouselMobileContainer: {
    marginBottom: 32,
  },
  carouselCardMobile: {
    width: '85vw',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: 340,
    height: 340,
  },
  mobileCardContentBox: {
    padding: 20,
    gap: 12,
    flex: 1,
    justifyContent: 'flex-start',
  },
  mobileTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    lineHeight: 24,
  },
  mobileSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  mobileButton: {
    backgroundColor: '#14b8a6',
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
  mobileImageBox: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
  },
  mobileImage: {
    width: '100%',
    height: 180,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  dotActive: {
    backgroundColor: '#14b8a6',
  },
  dotInactive: {
    backgroundColor: '#d1d5db',
  },
});

export { ImageCardCarousel };
