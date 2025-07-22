// Converted from malohr-platform/components/ui/card.tsx
// Card components for React Native using View and Text
import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

export interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface CardTitleProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  style?: TextStyle;
}

export interface CardContentProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export interface CardFooterProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

const CardHeader: React.FC<CardHeaderProps> = ({ children, style }) => (
  <View style={[styles.cardHeader, style]}>
    {children}
  </View>
);

const CardTitle: React.FC<CardTitleProps> = ({ children, style }) => (
  <Text style={[styles.cardTitle, style]}>
    {children}
  </Text>
);

const CardDescription: React.FC<CardDescriptionProps> = ({ children, style }) => (
  <Text style={[styles.cardDescription, style]}>
    {children}
  </Text>
);

const CardContent: React.FC<CardContentProps> = ({ children, style }) => (
  <View style={[styles.cardContent, style]}>
    {children}
  </View>
);

const CardFooter: React.FC<CardFooterProps> = ({ children, style }) => (
  <View style={[styles.cardFooter, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb', // border
    backgroundColor: '#ffffff', // bg-card
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'column',
    gap: 6, // space-y-1.5
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  cardTitle: {
    fontSize: 24, // text-2xl
    fontWeight: '600', // font-semibold
    lineHeight: 28,
    letterSpacing: -0.025, // tracking-tight
    color: '#1f2937', // text-card-foreground
  },
  cardDescription: {
    fontSize: 14, // text-sm
    color: '#6b7280', // text-muted-foreground
    lineHeight: 20,
  },
  cardContent: {
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 24,
  },
});

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
