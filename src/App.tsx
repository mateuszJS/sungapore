import React from 'react'
import MapPanel from './panels/MapPanel'
import ChartPanel from './panels/ChartPanel'
import CurrWeatherPanel from './panels/CurrWeatherPanel'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 45%',
    gridTemplateAreas: `
      "map currWeather"
      "map chart"
    `,
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
    padding: 50,
    gap: 50,
  },
  currWeather: {
    gridArea: 'currWeather',
  },
  map: {
    gridArea: 'map',
  },
  chart: {
    gridArea: 'chart',
  },
}))

const App = () => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <section className={classes.currWeather}>
        <CurrWeatherPanel />
      </section>
      <section className={classes.map}>
        <MapPanel />
      </section>
      <section className={classes.chart}>
        <ChartPanel />
      </section>
    </div>
  )
}

export default App
