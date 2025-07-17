// Converted from malohr-platform/hooks/use-mobile.tsx
// Mobile detection hook for React Native - always returns true since we're on mobile
import React from 'react';
import { Dimensions } from 'react-native';

export function useIsMobile() {
  // In React Native, we're always on a mobile device
  // But we can still detect screen size for responsive design
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      // Consider tablets (width > 768) as non-mobile for layout purposes
      setIsMobile(window.width < 768);
    });

    // Initial check
    const { width } = Dimensions.get('window');
    setIsMobile(width < 768);

    return () => subscription?.remove();
  }, []);

  return isMobile;
} 