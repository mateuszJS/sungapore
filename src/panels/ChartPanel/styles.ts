import { makeStyles } from '@material-ui/core/styles'

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  toggleWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  chartWrapper: {
    flexGrow: 1,
  },
})
