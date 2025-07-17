const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Enable CSS support for web
config.resolver.sourceExts.push('css');

// Add web-specific extensions
config.resolver.platforms = ['ios', 'android', 'native', 'web'];

// Add alias for src folder
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
};

module.exports = config; 