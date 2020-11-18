import { useEffect } from 'react'
import { useDispatch, useSelector, citiesListActions } from 'redux-store'
import queryString from 'query-string'
import { fetchApi, getWeatherKey } from '~/utils'
import { useFilterState } from 'hooks'

const API_KEY = '0dd7b5ace3de1d95a6726e32a3651e13'

type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

type OpenWeatherRes = {
  data: {
    current: {
      sunrise: number
      sunset: number
      temp: number
      pressure: number
      humidity: number
      weather: Weather[]
    }
    daily: Array<{
      dt: number
      sunrise: number
      sunset: number
      temp: {
        min: number
        max: number
        weather: Weather[]
      }
    }>
  }
}

const useForecast = () => {
  const { isReady, lat, lng } = useFilterState()
  const forecast = useSelector((state) => state.forecast)
  const dispatch = useDispatch()
  console.log(isReady, lat, lng)
  useEffect(() => {
    if (isReady && !forecast.loading && !forecast.data.current) {
      dispatch(citiesListActions.loading())
      const fetchCitiesList = async () => {
        try {
          const { data } = await fetchApi<OpenWeatherRes>(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&appid=${API_KEY}`,
          )
          console.log(data)
          // dispatch(
          //   citiesListActions.success(
          //     data.map((city) => ({
          //       lat: city.latitude,
          //       lng: city.longitude,
          //       name: city.name,
          //       region: city.region,
          //     })),
          //   ),
          // )
        } catch (err) {
          dispatch(citiesListActions.error(err))
        }
      }
      fetchCitiesList()
    }
  }, [lat, lng])

  return {}
}

export default useForecast
