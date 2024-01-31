import chakraTheme from '@chakra-ui/theme'
import { extendBaseTheme } from '@chakra-ui/react'

const { Button, Card, FormError, FormLabel, Menu, Avatar, Spinner, Switch, Alert } = chakraTheme.components

export const theme = extendBaseTheme({
  components: {
    Button,
    Card,
    FormError,
    FormLabel,
    Menu,
    Avatar,
    Spinner,
    Switch,
    Alert
  },
  styles: {
    global: () => ({
      body: {
        bg: "#0D0221",
        color:"#fff"
      }
    })
  }
}
)