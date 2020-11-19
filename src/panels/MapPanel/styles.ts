import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  root: {
    height: '100%',
  },
  logo: {
    height: 27,
    alignSelf: 'flex-start',
  },
  verticalCenter: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
  },
  title: {
    fontSize: '3rem',
    fontWeight: 300,
  },
  subtitle: {
    margin: '10px 0 40px 2px',
    fontWeight: 300,
  },
  mapWrapper: {
    position: 'relative',
  },
  point: {
    overflow: 'visible',
    background: 'none',
    borderColor: 'transparent',
    position: 'absolute',
    fontSize: 15,
    padding: 5,
    cursor: 'pointer',
    color: theme.palette.accents.neon5,
    '&:before': {
      content: '""',
      display: 'block',
      width: '1em',
      height: '1em',
      borderRadius: '50% 50% 50% 0',
      background: 'currentColor',
      transform: 'rotate(-45deg)',
      margin: '-1.17em 0 0 -0.47em',
      borderColor: 'transparent',
      padding: 0,
    },
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      fontSize: 25,
      '&:after': {
        position: 'absolute',
        content: 'attr(data-name)',
        padding: 2,
        borderRadius: 4,
        fontSize: 16,
        backgroundColor: theme.palette.background.paper,
        border: '4px solid currentColor',
        transform: 'translateX(calc(-50% - 6px))',
        bottom: 14,
        whiteSpace: 'nowrap',
        zIndex: 1,
      },
    },
  },
  activePoint: {
    fontSize: 25,
    color: theme.palette.accents.neon1,
  },
}))
