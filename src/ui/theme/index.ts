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
      secondary: '#bbb',
    },
    secondary: {
      main: '#bbb',
    },
    error: {
      main: '#ff0000',
    },
    background: {
      default: '#202020',
      paper: '#333',
    },
  },
  typography,
})

export default theme
