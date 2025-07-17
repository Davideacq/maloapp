import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { useScreenSize } from '../hooks/use-screen-size';
import { ImageCardOverlay, ImageCardOverlayProps } from './image-card-overlay';

export interface ImageCardCarouselProps {
  cards: ImageCardOverlayProps[];
  style?: ViewStyle;
}

const ImageCardCarousel: React.FC<ImageCardCarouselProps> = ({ cards, style }) => {
  const { isSmallScreen } = useScreenSize();

  if (isSmallScreen) {
    // Layout carousel per schermi piccoli
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.carouselContainer, style]}
        style={styles.carousel}
      >
        {cards.map((cardProps, index) => (
          <View key={index} style={styles.carouselCard}>
            <ImageCardOverlay
              {...cardProps}
              style={StyleSheet.flatten([
                styles.smallScreenCard,
                cards.length === 1 ? styles.singleCard : styles.multipleCard
              ])}
            />
          </View>
        ))}
      </ScrollView>
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
    paddingRight: 0, // Rimuovo il padding per schermi piccoli
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
    width: '100%', // 100% width per una sola card
  },
  multipleCard: {
    width: '100%', // 100% width anche per multiple card su schermi piccoli
  },
});

export { ImageCardCarousel };
