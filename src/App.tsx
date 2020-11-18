import React from 'react'
import Map from './components/Map'
import ChartPanel from './components/ChartPanel'
import CurrWeatherPanel from './components/CurrWeatherPanel'

function App() {
  return (
    <div className="App">
      <CurrWeatherPanel />
      <Map />
      <ChartPanel />
    </div>
  )
}

export default App
