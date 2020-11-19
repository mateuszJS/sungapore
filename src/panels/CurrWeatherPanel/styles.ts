import { makeStyles } from '@material-ui/core/styles'

export default makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 100, // to avoid shifting content during loading
  },
  tempWrapper: {
    display: 'flex',
    margin: '0 0 20px',
    '& > svg': {
      marginTop: 3,
    },
  },
  tempDataWrapper: {
    flexGrow: 1,
  },
  listWrapper: {
    display: 'flex',
    margin: 0,
    padding: 0,
    justifyContent: 'space-between',
    marginTop: 5,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
  },
  twoColumns: {
    flexWrap: 'wrap',
    '& > *': {
      padding: 5,
      width: '50%',
    },
    '& svg': {
      marginRight: 10,
    },
  },
  advertPlaceholder: {
    fontSize: '2em',
    fontWeight: 100,
    opacity: 0.2,
    textTransform: 'uppercase',
  },
})
