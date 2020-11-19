import { useEffect } from 'react'
import { useDispatch, useSelector, forecastActions } from '~/redux'
import { Forecast } from '~/redux/forecast'
import { fetchApi, getWeatherKey } from '~/utils'
import { useFilterState } from '~/hooks'

const API_KEY = '0dd7b5ace3de1d95a6726e32a3651e13'

let loading = false // shared state between hooks
// to avoid making two requests at the same time

const useForecast = () => {
  const { isReady, lat, lng } = useFilterState()
  const forecast = useSelector((state) => state.forecast)
  const dispatch = useDispatch()

  useEffect(() => {
    if (isReady && !loading && !forecast.data[getWeatherKey(lat, lng)]) {
      loading = true
      dispatch(forecastActions.loading())

      const fetchCitiesList = async () => {
        try {
          const { current, daily, hourly } = await fetchApi<Forecast>(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&appid=${API_KEY}&units=metric`,
          )
          console.log('changed to false')
          loading = false
          dispatch(
            forecastActions.success({
              lat,
              lng,
              current,
              daily,
              hourly,
            }),
          )
        } catch (err) {
          console.log('changed to false')
          loading = false
          dispatch(forecastActions.error(err))
        }
      }
      fetchCitiesList()
    }
  }, [lat, lng])

  const data = forecast.data[getWeatherKey(lat, lng)]

  return {
    loading: loading || forecast.loading,
    data,
    error: data ? null : forecast.error,
  }
}

export default useForecast
