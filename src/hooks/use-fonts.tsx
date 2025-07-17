// Custom hook for font loading with Onest as primary font
// Manages font loading state and provides Onest fonts with system fallbacks
import { useFonts } from 'expo-font';

export function useCustomFonts() {
  const [fontsLoaded, error] = useFonts({
    // Onest font family
    'Onest-Regular': require('../../assets/fonts/Onest-Regular.ttf'),
    'Onest-Medium': require('../../assets/fonts/Onest-Medium.ttf'),
    'Onest-SemiBold': require('../../assets/fonts/Onest-SemiBold.ttf'),
    'Onest-Bold': require('../../assets/fonts/Onest-Bold.ttf'),
    
    // Fallback font
    'SpaceMono': require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Define font families with Onest as primary
  const fontFamilies = {
    // H1 and H2 use SemiBold
    h1: fontsLoaded ? 'Onest-SemiBold' : 'System',
    h2: fontsLoaded ? 'Onest-SemiBold' : 'System',
    
    // All other text uses Medium
    body: fontsLoaded ? 'Onest-Medium' : 'System',
    bodyRegular: fontsLoaded ? 'Onest-Regular' : 'System',
    bodyBold: fontsLoaded ? 'Onest-Bold' : 'System',
    
    // Monospace fallback
    mono: fontsLoaded ? 'SpaceMono' : 'monospace',
  };

  return {
    fontsLoaded,
    error,
    fontFamilies,
  };
} 