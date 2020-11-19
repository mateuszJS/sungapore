import { useEffect } from 'react'
import { useDispatch, useSelector, citiesListActions } from '~/redux'
import { fetchApi } from '~/utils'

type GeoDBResponse = {
  data: Array<{
    latitude: number
    longitude: number
    name: string
    region: string
  }>
}

const SINGAPORE_COUNTY_ID = 'SG'
let loading = false // shared state between hooks
// to avoid making two requests at the same time

const useCitiesList = () => {
  const citiesList = useSelector((state) => state.citiesList)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!citiesList.data.length && !loading) {
      loading = true
      dispatch(citiesListActions.loading())

      const fetchCitiesList = async () => {
        try {
          const { data } = await fetchApi<GeoDBResponse>(
            `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds=${SINGAPORE_COUNTY_ID}`,
            {
              method: 'GET',
              headers: {
                'x-rapidapi-key': '6b55033f68msh48062e129c846e7p177948jsncb5b1a5b5b3b',
                'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
              },
            },
          )

          loading = false
          dispatch(
            citiesListActions.success(
              data.map((city) => ({
                lat: city.latitude,
                lng: city.longitude,
                name: city.name,
                region: city.region,
              })),
            ),
          )
        } catch (err) {
          loading = false
          dispatch(citiesListActions.error(err))
        }
      }
      fetchCitiesList()
    }
  }, [])

  return {
    loading: loading || citiesList.loading,
    data: citiesList.data,
    error: citiesList.error,
  }
}

export default useCitiesList
