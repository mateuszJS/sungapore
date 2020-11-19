import React, { ReactNode } from 'react'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography } from '@material-ui/core'
import useStyles from './styles'

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
          <CircularProgress color="inherit" size={60} />
        </div>
      )}
      {error && <Typography className={classes.error}>{error}</Typography>}
    </Paper>
  )
})

export default Panel
