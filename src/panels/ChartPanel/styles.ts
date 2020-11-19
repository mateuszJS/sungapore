import { makeStyles } from '@material-ui/core/styles'

export default makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  toggleWrapper: {
    display: 'flex',
    alignItems: 'center',
    margin: '10px 0',
  },
  chartSizeChecked: {
    flexGrow: 1,
  },
  chartWrapper: {
    width: 0,
    height: 0,
    overflow: 'visible',
  },
})
