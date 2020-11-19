import React, { ReactNode } from 'react'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    height: '100%',
    padding: 30,
    borderRadius: 30,
    boxShadow: '0px 5px 20px 0px #050515',
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
    backgroundColor: fade(theme.palette.background.paper, 0.3),
  },
  error: {
    backgroundColor: fade(theme.palette.error.main, 0.7),
    padding: 5,
  },
}))

type Props = {
  children: ReactNode
  loading?: boolean
  error?: string | null
}

type Ref = HTMLDivElement

const Panel = React.forwardRef<Ref, Props>(({ children, loading, error }, ref) => {
  const classes = useStyles()
  return (
    <Paper className={classes.root} ref={ref}>
      {children}
      {loading && (
        <div className={classes.loader}>
          <CircularProgress />
        </div>
      )}
      {error && <Typography className={classes.error}>{error}</Typography>}
    </Paper>
  )
})

export default Panel
