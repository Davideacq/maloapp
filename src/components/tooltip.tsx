// Tooltip component for React Native
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

export interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  style?: ViewStyle;
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  style,
  delay = 500,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    const id = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const getTooltipStyle = () => {
    switch (position) {
      case 'bottom':
        return styles.tooltipBottom;
      case 'left':
        return styles.tooltipLeft;
      case 'right':
        return styles.tooltipRight;
      default:
        return styles.tooltipTop;
    }
  };

  const getArrowStyle = () => {
    switch (position) {
      case 'bottom':
        return styles.arrowBottom;
      case 'left':
        return styles.arrowLeft;
      case 'right':
        return styles.arrowRight;
      default:
        return styles.arrowTop;
    }
  };

  return (
    <View style={[styles.container, style]}>
      <Pressable
        onPressIn={showTooltip}
        onPressOut={hideTooltip}
        onLongPress={showTooltip}
        onPress={hideTooltip}
      >
        {children}
      </Pressable>
      
      {isVisible && (
        <View style={[styles.tooltip, getTooltipStyle()]}>
          <Text style={styles.tooltipText}>{content}</Text>
          <View style={[styles.arrow, getArrowStyle()]} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: '#1f2937',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    maxWidth: 200,
    zIndex: 1000,
  },
  tooltipTop: {
    bottom: '100%',
    left: '50%',
    transform: [{ translateX: -50 }],
    marginBottom: 8,
  },
  tooltipBottom: {
    top: '100%',
    left: '50%',
    transform: [{ translateX: -50 }],
    marginTop: 8,
  },
  tooltipLeft: {
    right: '100%',
    top: '50%',
    transform: [{ translateY: -50 }],
    marginRight: 8,
  },
  tooltipRight: {
    left: '100%',
    top: '50%',
    transform: [{ translateY: -50 }],
    marginLeft: 8,
  },
  tooltipText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
  arrowTop: {
    top: '100%',
    left: '50%',
    transform: [{ translateX: -4 }],
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#1f2937',
  },
  arrowBottom: {
    bottom: '100%',
    left: '50%',
    transform: [{ translateX: -4 }],
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#1f2937',
  },
  arrowLeft: {
    left: '100%',
    top: '50%',
    transform: [{ translateY: -4 }],
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#1f2937',
  },
  arrowRight: {
    right: '100%',
    top: '50%',
    transform: [{ translateY: -4 }],
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderRightWidth: 8,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: '#1f2937',
  },
}); 