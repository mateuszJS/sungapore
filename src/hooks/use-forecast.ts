import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector, forecastActions } from '~/redux'
import { Forecast } from '~/redux/forecast'
import { fetchApi, getWeatherKey } from '~/utils'
import { useFilterState } from '~/hooks'

let loading = false // shared state between hooks
// to avoid making two requests at the same time

const useForecast = () => {
  const { isReady, lat, lng } = useFilterState()
  const forecast = useSelector((state) => state.forecast)
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    if (isReady && !loading && !forecast.data[getWeatherKey(lat, lng)]) {
      loading = true
      dispatch(forecastActions.loading())

      const fetchCitiesList = async () => {
        try {
          const { current, daily, hourly } = await fetchApi<Forecast>(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=minutely,alerts&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric`,
          )
          const currentDayInfo = daily[0]
          loading = false
          dispatch(
            forecastActions.success({
              lat,
              lng,
              current: {
                ...current,
                minTemp: currentDayInfo.temp.min,
                maxTemp: currentDayInfo.temp.max,
              },
              daily: daily.slice(1, 8), // API returns next 8 days
              hourly,
            }),
          )
        } catch (err) {
          loading = false
          dispatch(forecastActions.error(t('common.genericError')))
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
