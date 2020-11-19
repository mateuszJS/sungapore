import { createMuiTheme } from '@material-ui/core/styles'
import typography from './typography'

const accents = {
  neon1: '#ff00ff',
  neon2: '#00ffff',
  neon3: '#0000ff',
  neon5: '#FFA500',
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    accents: typeof accents
  }
  interface PaletteOptions {
    accents: typeof accents
  }
}

const theme = createMuiTheme({
  palette: {
    accents,
    text: {
      primary: '#fff',
      secondary: '#bbb',
    },
    secondary: {
      main: '#bbb',
    },
    error: {
      main: 'rgb(255, 0, 94)',
    },
    background: {
      default: '#202020',
      paper: '#333',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1100,
      lg: 1280,
      xl: 1920,
    },
  },
  typography,
})

export default theme
