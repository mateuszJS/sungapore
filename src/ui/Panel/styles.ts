import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    borderRadius: 30,
    boxShadow: '0px 5px 20px 0px #050515',
    overflow: 'hidden',
  },
  loader: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: fade(theme.palette.background.paper, 0.8),
    color: theme.palette.text.primary,
  },
  error: {
    backgroundColor: fade(theme.palette.error.main, 0.5),
    padding: 10,
    borderRadius: 40,
  },
}))
