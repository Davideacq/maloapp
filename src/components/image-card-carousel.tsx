import React, { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, ViewStyle, Dimensions } from 'react-native';
import { useScreenSize } from '../hooks/use-screen-size';
import { ImageCardOverlay, ImageCardOverlayProps } from './image-card-overlay';

export interface ImageCardCarouselProps {
  cards: ImageCardOverlayProps[];
  style?: ViewStyle;
}

const ImageCardCarousel: React.FC<ImageCardCarouselProps> = ({ cards, style }) => {
  const { isSmallScreen, isMediumScreen } = useScreenSize();

  // Stato per il dot attivo
  const [activeIndex, setActiveIndex] = useState(0);

  // Gestione dello scroll per aggiornare l'indice attivo
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const cardWidth = event.nativeEvent.layoutMeasurement.width;
    const index = Math.round(scrollPosition / cardWidth);
    setActiveIndex(index);
  };

  if (isSmallScreen) {
    const windowWidth = Dimensions.get('window').width;
    const horizontalPadding = 32; // 16 left + 16 right from carouselMobileContainer
    const cardSideInset = 8; // extra inset so right border radius is visible
    const cardWidth = windowWidth - horizontalPadding - cardSideInset * 2;

    // Layout mobile: testo sopra, immagine sotto, dot indicator
    return (
      <View style={[styles.carouselMobileContainer, style]}>        
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.carouselContainer, { paddingRight: 16 }]}
          style={styles.carousel}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          decelerationRate="fast"
          snapToInterval={cardWidth + 16} // card width + marginRight
          snapToAlignment="start"
          disableIntervalMomentum
        >
          {cards.map((cardProps, index) => (
            <View
              key={index}
              style={[
                styles.carouselCardMobile,
                {
                  width: cardWidth,
                  marginRight: index === cards.length - 1 ? cardSideInset : 16,
                  marginLeft: index === 0 ? cardSideInset : 0,
                },
              ]}
            >
              {/* Contenuto della card */}
              <View style={styles.mobileCardContentBox}>
                <Text style={styles.mobileTitle}>{cardProps.title}</Text>
                {cardProps.subtitle && <Text style={styles.mobileSubtitle}>{cardProps.subtitle}</Text>}
                {cardProps.buttonText && cardProps.onButtonPress && (
                  <Pressable 
                    style={({ pressed }) => [
                      styles.mobileButton,
                      pressed && styles.mobileButtonPressed
                    ]}
                    onPress={cardProps.onButtonPress}
                  >
                    <Text style={styles.mobileButtonText}>{cardProps.buttonText}</Text>
                  </Pressable>
                )}
              </View>
              {/* Immagine della card */}
              <View style={styles.mobileImageBox}>
                <Image source={cardProps.image} style={styles.mobileImage} resizeMode="cover" />
              </View>
            </View>
          ))}
        </ScrollView>
        {/* Dot indicator migliorato */}
        <View style={styles.dotsContainer}>
          {cards.map((_, idx) => (
            <Pressable
              key={idx}
              style={[
                styles.dot,
                idx === activeIndex ? styles.dotActive : styles.dotInactive
              ]}
              onPress={() => {
                // Scroll to specific card
                // This would require a ref to the ScrollView
              }}
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
          style={isMediumScreen ? styles.mediumScreenCard : styles.largeScreenCard}
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
    paddingHorizontal: 0,
    gap: 0,
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
    aspectRatio: 2 / 1,
    minHeight: 120,
  },
  largeScreenCard: {
    flex: 1,
    aspectRatio: 2 / 1,
    minHeight: 120,
  },
  singleCard: {
    width: '85%',
    maxWidth: 400,
  },
  multipleCard: {
    width: '85%',
    maxWidth: 400,
    marginRight: 16,
  },
  carouselMobileContainer: {
    marginBottom: 32,
    paddingHorizontal: 16,
  },
  carouselCardMobile: {
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    // marginRight dynamic via inline
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    minHeight: 320,
  },
  mobileCardContentBox: {
    padding: 20,
    gap: 12,
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'white',
  },
  mobileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    lineHeight: 26,
    marginBottom: 4,
  },
  mobileSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 22,
    marginBottom: 8,
  },
  mobileButton: {
    backgroundColor: '#14b8a6',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mobileButtonPressed: {
    opacity: 0.8,
  },
  mobileButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  mobileImageBox: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
  },
  mobileImage: {
    width: '100%',
    height: '100%',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: '#14b8a6',
  },
  dotInactive: {
    backgroundColor: '#d1d5db',
  },
  mediumScreenCard: {
    flex: 1,
    aspectRatio: 2 / 1,
    minHeight: 120,
  },
});

export { ImageCardCarousel };
