import React from 'react'
import Map from './components/Map'
import Chart from './components/Chart'

const data = [
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: 3 },
]

function App() {
  return (
    <div className="App">
      <Map />
      <Chart width={500} height={400} data={data} />
    </div>
  )
}

export default App
