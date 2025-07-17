// Typography components for consistent Onest font usage
// Pre-styled Text components for headings and body text
import React from 'react';
import { Text, TextProps, TextStyle } from 'react-native';
import { useTypography } from '../hooks/use-typography';

interface TypographyProps extends TextProps {
  color?: string;
  align?: 'left' | 'center' | 'right';
}

// Heading components with Onest SemiBold
export const H1: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.h1,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

export const H2: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.h2,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

export const H3: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.h3,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

export const H4: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.h4,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

// Body text components with Onest Medium
export const BodyLarge: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.bodyLarge,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

export const Body: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.body,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

export const BodySmall: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.bodySmall,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

export const Caption: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.caption,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

// Special variants
export const BodyRegular: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.bodyRegular,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

export const BodyBold: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.bodyBold,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

// Label for forms
export const Label: React.FC<TypographyProps> = ({ children, style, color, align, ...props }) => {
  const { typography } = useTypography();
  
  const combinedStyle: TextStyle = {
    ...typography.label,
    ...(color && { color }),
    ...(align && { textAlign: align }),
    ...(style as TextStyle),
  };

  return (
    <Text style={combinedStyle} {...props}>
      {children}
    </Text>
  );
};

// Default export with all typography components
export const Typography = {
  H1,
  H2,
  H3,
  H4,
  BodyLarge,
  Body,
  BodySmall,
  Caption,
  BodyRegular,
  BodyBold,
  Label,
}; 