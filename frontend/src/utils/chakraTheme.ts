import chakraTheme from '@chakra-ui/theme'
import { extendBaseTheme } from '@chakra-ui/react'

const { Button, Card, FormError, FormLabel, Menu, Avatar, Spinner, Switch, Alert, Input, Heading, Text } = chakraTheme.components

// Design Tokens - Single source of truth for all styling
export const tokens = {
  colors: {
    // Primary palette
    primary: {
      500: '#9b34ef',
      600: '#490cb0',
      700: '#3a0a8c',
    },
    // Background colors
    background: {
      dark: '#0D0221',
      darkTransparent: '#0d0221ef',
      card: '#0d0221ef',
    },
    // Text colors
    text: {
      primary: '#ffffff',
      secondary: '#a0a0a0',
      dark: '#000000',
    },
    // Accent colors
    accent: {
      purple: '#c600ff',
      hover: '#c600ff',
    },
  },
  gradients: {
    // Primary button gradient
    primaryButton: 'linear-gradient(345deg, #490cb0 0%, #9b34ef 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100%)',
    // Outline button gradient (for hover fill effect)
    outlineButton: 'linear-gradient(345deg, #fff 0%, #fff 33%, rgba(255, 255, 255, 0) 66%, rgba(255, 255, 255, 0) 100%)',
  },
  shadows: {
    // Card glow effect
    card: '0px 0px 12.4818px #9b34ef, 0px 1.16058px 5.3212px #9b34ef',
    cardIntense: '0px 0px 18.4818px #9b34ef, 0px 1.16058px 5.3212px #9b34ef',
  },
  radii: {
    button: '60px',
    card: '10px',
    input: '5px',
    form: '12px',
  },
} as const

export const theme = extendBaseTheme({
  colors: {
    brand: {
      50: '#f5e6ff',
      100: '#d9b3ff',
      200: '#be80ff',
      300: '#a24dff',
      400: '#9b34ef',
      500: '#9b34ef',
      600: '#490cb0',
      700: '#3a0a8c',
      800: '#2b0769',
      900: '#1c0446',
    },
    background: tokens.colors.background,
  },
  components: {
    Button: {
      ...Button,
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: tokens.radii.button,
        transition: 'all 0.5s',
      },
      variants: {
        // Primary gradient button (purple glow)
        primary: {
          color: 'white',
          bg: tokens.gradients.primaryButton,
          backgroundSize: '400% 400%',
          backgroundPosition: '99% 50%',
          border: '2px solid transparent',
          _hover: {
            backgroundPosition: '1% 50%',
            borderColor: tokens.colors.accent.purple,
          },
          _disabled: {
            opacity: 0.6,
            cursor: 'not-allowed',
          },
        },
        // Outline button with fill on hover
        outline: {
          color: 'white',
          bg: tokens.gradients.outlineButton,
          backgroundSize: '400% 400%',
          backgroundPosition: '0%',
          border: '2px solid white',
          overflow: 'hidden',
          _hover: {
            backgroundPosition: '99% 50%',
            color: tokens.colors.background.dark,
          },
        },
        // Secondary button (simpler style)
        secondary: {
          color: 'white',
          bg: 'transparent',
          border: '2px solid white',
          borderRadius: '24px',
          _hover: {
            bg: 'white',
            color: tokens.colors.background.dark,
          },
        },
      },
      sizes: {
        md: {
          padding: '20px 50px',
          fontSize: '14px',
        },
        sm: {
          padding: '15px 30px',
          fontSize: '12px',
        },
      },
      defaultProps: {
        variant: 'primary',
        size: 'md',
      },
    },
    Card: {
      ...Card,
      baseStyle: {
        container: {
          bg: tokens.colors.background.card,
          borderRadius: tokens.radii.card,
          boxShadow: tokens.shadows.card,
        },
      },
    },
    FormError,
    FormLabel: {
      ...FormLabel,
      baseStyle: {
        fontSize: '14px',
        color: tokens.colors.text.dark,
      },
    },
    Menu,
    Avatar,
    Spinner: {
      ...Spinner,
      defaultProps: {
        thickness: '4px',
        speed: '0.65s',
        emptyColor: 'white',
        color: tokens.colors.primary[500],
      },
    },
    Switch,
    Alert,
    Input,
    Heading,
    Text,
  },
  styles: {
    global: () => ({
      body: {
        bg: tokens.colors.background.dark,
        color: tokens.colors.text.primary,
      },
    }),
  },
})