import React from 'react'
import { ReactComponent as SingaporeSvg } from '~/maps/singapore_map.svg'
import { useCitiesList, useFilterState } from '~/hooks'
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
  const { lat, lng, setLat, setLng } = useFilterState()
  const classes = useStyles()
  const selectedPlace = data.find((city) => city.lat === lat && city.lng === lng)
  const getOnChangeHandler = (lat: number, lng: number) => () => {
    setLat(lat)
    setLng(lng)
  }

  return (
    <div>
      {selectedPlace && <h1>{selectedPlace.name}</h1>}
      {selectedPlace && <h1>{selectedPlace.region}</h1>}
      <div className={classes.mapWrapper}>
        <SingaporeSvg width="100%" />
        {data.map((city) => (
          <button
            key={city.name}
            data-name={city.name}
            className={
              selectedPlace && selectedPlace.name === city.name
                ? `${classes.point} ${classes.activePoint}`
                : classes.point
            }
            style={getStyles(city.lat, city.lng)}
            onClick={getOnChangeHandler(city.lat, city.lng)}
          />
        ))}
        {loading}
      </div>
    </div>
  )
}

export default Map
