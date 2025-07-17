// Skeleton component for loading states in React Native
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';

interface SkeletonProps {
  height?: number;
  width?: number | string;
  borderRadius?: number;
  style?: ViewStyle;
}

export function Skeleton({ 
  height = 20, 
  width = '100%', 
  borderRadius = 4, 
  style 
}: SkeletonProps) {
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    
    animation.start();
    
    return () => animation.stop();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          height,
          width: typeof width === 'string' ? width as any : width,
          borderRadius,
          opacity: fadeAnim,
        },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e5e7eb',
  },
}); 