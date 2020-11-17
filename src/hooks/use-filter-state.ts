import { useQueryParam, NumberParam } from 'use-query-params'
import { useCitiesList } from '.'

const getCurrTime = () => new Date().getTime()

const useFilterState = () => {
  const citiesList = useCitiesList()
  const defaultLat = citiesList.data[0]?.lat
  const defaultLng = citiesList.data[0]?.lng
  const [dt, setDt] = useQueryParam('dt', NumberParam)
  const [lat, setLat] = useQueryParam('lat', NumberParam)
  const [lng, setLng] = useQueryParam('lng', NumberParam)

  return {
    isReady: !!(dt && lat && lng),
    dt: dt || getCurrTime(),
    setDt,
    lat: lat || defaultLat,
    setLat,
    lng: lng || defaultLng,
    setLng,
  }
}

export default useFilterState
