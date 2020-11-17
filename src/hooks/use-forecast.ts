import { useEffect } from 'react'
import { useDispatch, useSelector, citiesListActions } from 'redux-store'
import queryString from 'query-string'
import { fetchApi, getWeatherKey } from '~/utils'
import { useFilterState } from 'hooks'

const API_KEY = '0dd7b5ace3de1d95a6726e32a3651e13'

type OpenWeatherRes = {
  data: unknown
}

const useForecast = () => {
  const { isReady, lat, lng, dt } = useFilterState()
  const citiesList = useSelector((state) => {
    if (isReady) {
    }
    return []
    // const key = isReady == true ? getWeatherKey(lat, lng, dt) :
    // state.forecase
  })
  console.log(isReady, lat, lng, dt)
  useEffect(() => {
    if (!citiesList.data.length) {
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
  }, [lat, lng, dt])

  return {}
}

export default useForecast
