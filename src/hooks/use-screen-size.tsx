import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }: { window: ScaledSize }) => {
      setScreenSize(window);
    });

    return () => subscription?.remove();
  }, []);

  const isSmallScreen = screenSize.width < 850; // Breakpoint per tablet/mobile
  const isMediumScreen = screenSize.width >= 850 && screenSize.width < 1024;
  const isLargeScreen = screenSize.width >= 1024;

  return {
    width: screenSize.width,
    height: screenSize.height,
    isSmallScreen,
    isMediumScreen,
    isLargeScreen,
  };
}; 