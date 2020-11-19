import { createMuiTheme } from '@material-ui/core/styles'
import typography from './typography'

const accents = {
  neon1: '#ff00ff',
  neon2: '#00ffff',
  neon3: '#0000ff',
  neon5: 'orange',
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
      secondary: '#ccc',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#111',
      paper: '#333',
    },
  },
  typography,
})

export default theme
