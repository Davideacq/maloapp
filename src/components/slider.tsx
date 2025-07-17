// Slider component for React Native
import React from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface SliderProps {
  value?: number;
  onValueChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  showValue?: boolean;
  style?: ViewStyle;
  trackStyle?: ViewStyle;
  thumbStyle?: ViewStyle;
}

export const Slider: React.FC<SliderProps> = ({
  value = 0,
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showValue = false,
  style,
  trackStyle,
  thumbStyle,
}) => {
  const percentage = ((value - min) / (max - min)) * 100;
  const clampedPercentage = Math.max(0, Math.min(100, percentage));

  const handleTrackPress = (event: any) => {
    if (disabled) return;
    
    const { locationX } = event.nativeEvent;
    const trackWidth = 200; // Approximate track width
    const newPercentage = (locationX / trackWidth) * 100;
    const newValue = min + (newPercentage / 100) * (max - min);
    const steppedValue = Math.round(newValue / step) * step;
    const clampedValue = Math.max(min, Math.min(max, steppedValue));
    
    onValueChange?.(clampedValue);
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.trackContainer}>
        <Pressable
          style={[
            styles.track,
            trackStyle,
            disabled && styles.disabledTrack,
          ]}
          onPress={handleTrackPress}
          disabled={disabled}
        >
          <View
            style={[
              styles.fill,
              {
                width: `${clampedPercentage}%`,
              },
            ]}
          />
        </Pressable>
        <View
          style={[
            styles.thumb,
            {
              left: `${clampedPercentage}%`,
              transform: [{ translateX: -8 }],
            },
            thumbStyle,
            disabled && styles.disabledThumb,
          ]}
        />
      </View>
      
      {showValue && (
        <Text style={[styles.valueText, disabled && styles.disabledText]}>
          {value}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  trackContainer: {
    position: 'relative',
    width: 200,
    height: 20,
    justifyContent: 'center',
  },
  track: {
    width: '100%',
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    position: 'relative',
  },
  disabledTrack: {
    backgroundColor: '#f3f4f6',
  },
  fill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 16,
    height: 16,
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  disabledThumb: {
    backgroundColor: '#9ca3af',
    borderColor: '#f3f4f6',
  },
  valueText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  disabledText: {
    color: '#9ca3af',
  },
}); 