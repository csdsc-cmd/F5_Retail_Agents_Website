/**
 * Fusion5 Color System
 * Based on fusion5.com brand analysis - Orange to Purple gradient theme
 * Target audience: Enterprise retail executives (CEO, CTO, COO)
 */

export const colors = {
  // Fusion5 Brand Gradient Colors
  fusion: {
    orange: '#FF5C39',      // Primary accent - vibrant orange
    coral: '#FF7B5C',       // Lighter orange
    magenta: '#C44569',     // Mid gradient
    purple: '#6B2D5B',      // Deep purple
    deepPurple: '#3B1D4E',  // Darkest purple
  },

  // Primary Colors (Purple-based for enterprise feel)
  primary: {
    50: '#F5F0F7',
    100: '#EBE1EF',
    200: '#D6C3DF',
    300: '#B799C7',
    400: '#9A6FAF',
    500: '#7D4597',      // Main primary
    600: '#6B2D5B',      // Fusion5 deep purple
    700: '#522347',
    800: '#3B1D4E',      // Fusion5 darkest
    900: '#2A1438',
    950: '#1A0D22',
  },

  // Accent Colors (Orange-based for CTAs)
  accent: {
    50: '#FFF5F2',
    100: '#FFEBE5',
    200: '#FFD4C9',
    300: '#FFB3A1',
    400: '#FF8A70',
    500: '#FF5C39',      // Fusion5 primary orange
    600: '#E64A2A',
    700: '#CC3A1C',
    800: '#A62D15',
    900: '#802210',
  },

  // Neutral Grays (Warm undertones)
  gray: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Neutral warm (for text and backgrounds)
  neutral: {
    50: '#FDFCFB',
    100: '#F9F7F5',
    200: '#F3F0ED',
    300: '#E8E4E0',
    400: '#D1CCC6',
    500: '#A8A29E',
    600: '#78716C',
    700: '#57534E',
    800: '#44403C',
    900: '#292524',
  },

  // Semantic Colors
  success: {
    light: '#D1FAE5',
    DEFAULT: '#10B981',
    dark: '#047857',
  },
  warning: {
    light: '#FEF3C7',
    DEFAULT: '#F59E0B',
    dark: '#B45309',
  },
  error: {
    light: '#FEE2E2',
    DEFAULT: '#EF4444',
    dark: '#B91C1C',
  },
  info: {
    light: '#DBEAFE',
    DEFAULT: '#3B82F6',
    dark: '#1D4ED8',
  },

  // Pure Values
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent'
} as const;

// Gradient definitions for Fusion5 brand
export const gradients = {
  // Main brand gradient (orange to purple)
  brand: 'linear-gradient(135deg, #FF5C39 0%, #C44569 50%, #3B1D4E 100%)',
  brandHorizontal: 'linear-gradient(90deg, #FF5C39 0%, #C44569 50%, #3B1D4E 100%)',
  brandSubtle: 'linear-gradient(135deg, rgba(255,92,57,0.1) 0%, rgba(59,29,78,0.1) 100%)',

  // CTA gradients
  ctaPrimary: 'linear-gradient(135deg, #FF5C39 0%, #E64A2A 100%)',
  ctaSecondary: 'linear-gradient(135deg, #6B2D5B 0%, #3B1D4E 100%)',

  // Background gradients
  heroBackground: 'linear-gradient(180deg, #FDFCFB 0%, #F5F0F7 100%)',
  sectionAlt: 'linear-gradient(180deg, #F9F7F5 0%, #FFFFFF 100%)',

  // Overlay for hero images
  imageOverlay: 'linear-gradient(135deg, rgba(59,29,78,0.85) 0%, rgba(107,45,91,0.75) 100%)',
} as const;

// CSS Custom Properties Export
export const cssVariables = {
  // Brand
  '--color-fusion-orange': colors.fusion.orange,
  '--color-fusion-purple': colors.fusion.deepPurple,

  // Primary
  '--color-primary': colors.primary[600],
  '--color-primary-light': colors.primary[400],
  '--color-primary-dark': colors.primary[800],

  // Accent
  '--color-accent': colors.accent[500],
  '--color-accent-light': colors.accent[300],
  '--color-accent-dark': colors.accent[700],

  // Grays
  '--color-gray-50': colors.gray[50],
  '--color-gray-100': colors.gray[100],
  '--color-gray-200': colors.gray[200],
  '--color-gray-300': colors.gray[300],
  '--color-gray-400': colors.gray[400],
  '--color-gray-500': colors.gray[500],
  '--color-gray-600': colors.gray[600],
  '--color-gray-700': colors.gray[700],
  '--color-gray-800': colors.gray[800],
  '--color-gray-900': colors.gray[900],

  // Semantic
  '--color-success': colors.success.DEFAULT,
  '--color-warning': colors.warning.DEFAULT,
  '--color-error': colors.error.DEFAULT,
  '--color-info': colors.info.DEFAULT,

  // Gradients
  '--gradient-brand': gradients.brand,
  '--gradient-cta': gradients.ctaPrimary,

  // Pure
  '--color-white': colors.white,
  '--color-black': colors.black
} as const;

// Tailwind Config Export
export const tailwindColors = {
  fusion: colors.fusion,
  primary: colors.primary,
  accent: colors.accent,
  gray: colors.gray,
  neutral: colors.neutral,
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
  info: colors.info
} as const;
