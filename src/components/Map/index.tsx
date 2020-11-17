import React from 'react'

import { ReactComponent as SingaporeSvg } from '~/maps/singapore_map.svg'
import { useCitiesList } from 'hooks'
import useStyles from './styles'

const minLatitude = 1.166114
const maxLatitude = 1.469723
const minLongitude = 103.603101
const maxLongitude = 104.087748
const diffLatitude = maxLatitude - minLatitude
const diffLongitude = maxLongitude - minLongitude

const getStyles = (lat: number, lng: number) => ({
  bottom: ((lat - minLatitude) / diffLatitude) * 100 + '%',
  left: ((lng - minLongitude) / diffLongitude) * 100 + '%',
})

const Map = () => {
  const { loading, error, data } = useCitiesList()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <SingaporeSvg width="100%" />
      {data.map((city) => (
        <div key={city.name} className={classes.point} style={getStyles(city.lat, city.lng)} />
      ))}
      {loading}
      {error}
    </div>
  )
}

export default Map
