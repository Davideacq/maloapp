// Carousel component for React Native
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Dimensions, Pressable, ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface CarouselItem {
  id: string;
  content: React.ReactNode;
  title?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  style?: ViewStyle;
  showIndicators?: boolean;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  style,
  showIndicators = true,
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 3000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: screenWidth } = Dimensions.get('window');

  const goToSlide = (index: number) => {
    if (index >= 0 && index < items.length) {
      setCurrentIndex(index);
      scrollViewRef.current?.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
    }
  };

  const nextSlide = () => {
    goToSlide(currentIndex + 1);
  };

  const prevSlide = () => {
    goToSlide(currentIndex - 1);
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  React.useEffect(() => {
    if (autoPlay) {
      const interval = setInterval(() => {
        const nextIndex = (currentIndex + 1) % items.length;
        goToSlide(nextIndex);
      }, autoPlayInterval);

      return () => clearInterval(interval);
    }
  }, [currentIndex, autoPlay, autoPlayInterval, items.length]);

  if (items.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, style]}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {items.map((item, index) => (
          <View key={item.id} style={[styles.slide, { width: screenWidth }]}>
            {item.content}
            {item.title && (
              <Text style={styles.slideTitle}>{item.title}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {showArrows && items.length > 1 && (
        <>
          <Pressable
            style={[styles.arrow, styles.leftArrow]}
            onPress={prevSlide}
            disabled={currentIndex === 0}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={currentIndex === 0 ? '#9ca3af' : '#374151'}
            />
          </Pressable>
          <Pressable
            style={[styles.arrow, styles.rightArrow]}
            onPress={nextSlide}
            disabled={currentIndex === items.length - 1}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={currentIndex === items.length - 1 ? '#9ca3af' : '#374151'}
            />
          </Pressable>
        </>
      )}

      {showIndicators && items.length > 1 && (
        <View style={styles.indicators}>
          {items.map((_, index) => (
            <Pressable
              key={index}
              style={[
                styles.indicator,
                index === currentIndex && styles.activeIndicator,
              ]}
              onPress={() => goToSlide(index)}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  slideTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -20 }],
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  leftArrow: {
    left: 16,
  },
  rightArrow: {
    right: 16,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
  },
  activeIndicator: {
    backgroundColor: '#3b82f6',
  },
}); 