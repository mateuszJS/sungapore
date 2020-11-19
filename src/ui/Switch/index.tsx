import React from 'react'
import { withStyles, createStyles } from '@material-ui/core/styles'
import MuiSwitch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch'

// base on IOS switch from material-ui demo
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/components/switches/CustomizedSwitches.tsx

interface Styles extends Partial<Record<SwitchClassKey, string>> {
  focusVisible?: string
}

interface Props extends SwitchProps {
  classes: Styles
  rightSideColor?: string
  leftSideColor?: string
}

type StylesProps = {
  rightSideColor?: Props['rightSideColor']
  leftSideColor?: Props['leftSideColor']
}

const Switch = withStyles((theme) =>
  createStyles<string, StylesProps>({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 1,
      '&$checked': {
        transform: 'translateX(16px)',
        color: theme.palette.text.primary,
        '& + $track': {
          background: ({ rightSideColor = theme.palette.accents.neon1 }) => rightSideColor,
          opacity: 1,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        color: ({ rightSideColor = theme.palette.accents.neon1 }) => rightSideColor,
        border: ({ rightSideColor = theme.palette.accents.neon1 }) => `6px solid ${rightSideColor}`,
      },
    },
    thumb: {
      margin: 2,
      width: 20,
      height: 20,
    },
    track: {
      borderRadius: 26 / 2,
      border: `2px solid transparent`,
      backgroundColor: ({ leftSideColor = theme.palette.text.secondary }) => leftSideColor,
      opacity: 1,
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {
      '&$colorSecondary': {
        color: ({ rightSideColor = theme.palette.accents.neon1 }) => rightSideColor,
      },
    },
    focusVisible: {},
    colorSecondary: {},
  }),
)(({ classes, ...props }: Props) => {
  return (
    <MuiSwitch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
        colorSecondary: classes.colorSecondary,
      }}
      {...props}
    />
  )
})

export default Switch
