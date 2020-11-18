import { makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme) => ({
  mapWrapper: {
    width: '50%',
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
    '&:before': {
      content: '""',
      display: 'block',
      width: '1em',
      height: '1em',
      borderRadius: '50% 50% 50% 0',
      background: 'blue',
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
        backgroundColor: 'white',
        border: '4px solid blue',
        transform: 'translateX(calc(-50% - 6px))',
        bottom: 14,
        whiteSpace: 'nowrap',
        zIndex: 1,
      },
    },
  },
  activePoint: {
    fontSize: 25,
  },
  // display: 'block',
  // position: 'absolute',
  // width: 10,
  // height: 10,
  // borderRadius: '50%',
  // backgroundColor: 'red',
  // margin: 0,
  // padding: 0,
}))
