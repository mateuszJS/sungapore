import React from 'react'
import Typography from '@material-ui/core/Typography'
import { ReactComponent as SingaporeSvg } from '~/maps/singapore_map.svg'
import LogoSvg from '~/icons/logo.svg'
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
  const { loading, data } = useCitiesList()
  const { lat, lng, setLat, setLng } = useFilterState()
  const classes = useStyles()
  const selectedPlace = data.find((city) => city.lat === lat && city.lng === lng)
  const getOnChangeHandler = (lat: number, lng: number) => () => {
    setLat(lat)
    setLng(lng)
  }

  return (
    <section className={classes.root}>
      <img src={LogoSvg} alt="logo" className={classes.logo} />
      <div className={classes.verticalCenter}>
        <Typography variant="h1" className={classes.title}>
          {selectedPlace?.name ?? ' '}
        </Typography>
        <Typography variant="h2" color="secondary" className={classes.subtitle}>
          {selectedPlace?.region ?? ' '}
        </Typography>
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
    </section>
  )
}

export default Map
