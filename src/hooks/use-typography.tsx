// Typography hook for consistent font usage across the app
// Provides pre-configured text styles with Onest fonts
import { TextStyle } from 'react-native';
import { useCustomFonts } from './use-fonts';

export function useTypography() {
  const { fontFamilies, fontsLoaded } = useCustomFonts();

  // Base text styles with Onest fonts
  const typography: Record<string, TextStyle> = {
    // Headings (SemiBold)
    h1: {
      fontFamily: fontFamilies.h1,
      fontSize: 32,
      fontWeight: '600',
      lineHeight: 40,
    },
    h2: {
      fontFamily: fontFamilies.h2,
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h3: {
      fontFamily: fontFamilies.body,
      fontSize: 20,
      fontWeight: '500',
      lineHeight: 28,
    },
    h4: {
      fontFamily: fontFamilies.body,
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 26,
    },

    // Body text (Medium)
    bodyLarge: {
      fontFamily: fontFamilies.body,
      fontSize: 18,
      fontWeight: '500',
      lineHeight: 26,
    },
    body: {
      fontFamily: fontFamilies.body,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    bodySmall: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    caption: {
      fontFamily: fontFamilies.body,
      fontSize: 12,
      fontWeight: '500',
      lineHeight: 16,
    },

    // Special variants
    bodyRegular: {
      fontFamily: fontFamilies.bodyRegular,
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 24,
    },
    bodyBold: {
      fontFamily: fontFamilies.bodyBold,
      fontSize: 16,
      fontWeight: '700',
      lineHeight: 24,
    },

    // Button text
    button: {
      fontFamily: fontFamilies.body,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
    buttonSmall: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },

    // Labels and inputs
    label: {
      fontFamily: fontFamilies.body,
      fontSize: 14,
      fontWeight: '500',
      lineHeight: 20,
    },
    input: {
      fontFamily: fontFamilies.body,
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 24,
    },
  };

  return {
    typography,
    fontFamilies,
    fontsLoaded,
  };
} 