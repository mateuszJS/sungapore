import { useQueryParam, NumberParam } from 'use-query-params'
import { useCitiesList } from '.'

export enum ForecastType {
  daily = 'daily',
  hourly = 'hourly',
}

const useFilterState = () => {
  const citiesList = useCitiesList()
  const defaultLat = citiesList.data[0]?.lat
  const defaultLng = citiesList.data[0]?.lng
  const [type, setType] = useQueryParam('type', NumberParam)
  const [lat, setLat] = useQueryParam('lat', NumberParam)
  const [lng, setLng] = useQueryParam('lng', NumberParam)
  const data = {
    type: type || ForecastType.daily,
    lat: lat || defaultLat,
    lng: lng || defaultLng,
  }

  return {
    isReady: !!(data.type && data.lat && data.lng),
    ...data,
    setType,
    setLat,
    setLng,
  }
}

export default useFilterState
