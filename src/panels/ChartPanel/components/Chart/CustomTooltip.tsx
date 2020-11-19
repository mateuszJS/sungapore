import React from 'react'
import { TooltipProps } from 'recharts'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

type Props = {
  active: boolean
  label: number
  labelFormatter: Required<TooltipProps>['labelFormatter']
  payload: Required<TooltipProps>['payload']
  formatter: Required<TooltipProps>['formatter']
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: fade(theme.palette.background.default, 0.75),
    '& > *:not(:last-child)': {
      marginBottom: 5,
    },
  },
}))

const CustomTooltip = ({ active, label, labelFormatter, payload, formatter }: Props) => {
  const classes = useStyles()

  if (active && payload) {
    return (
      <div className={classes.root}>
        <Typography>{labelFormatter(label)}</Typography>
        <Typography>{payload[0].payload.weather}</Typography>
        {payload.map((entry, index) => (
          <Typography key={entry.name} style={{ color: entry.color }}>
            {formatter(entry.value as number, entry.name, entry, index)}
          </Typography>
        ))}
      </div>
    )
  }

  return null
}

export default CustomTooltip
