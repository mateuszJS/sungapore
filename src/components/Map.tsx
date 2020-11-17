import React, { useEffect } from 'react'
import { ReactComponent as SingaporeSvg } from '~/maps/singapore_map.svg'
import { fetchApi } from '~/utils'
type GeoDBResponse = {
  data: Array<{
    latitude: number
    longitude: number
    name: string
    region: string
  }>
}

const fetchCitiesList = async (countriesIds: string[]) => {
  try {
    const { data } = await fetchApi<GeoDBResponse>(
      `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?limit=10&countryIds=${countriesIds}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '6b55033f68msh48062e129c846e7p177948jsncb5b1a5b5b3b',
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
        },
      },
    )
    console.log(data)
  } catch (err) {
    console.error(err)
  }
}

const Map = () => {
  useEffect(() => {
    fetchCitiesList(['SG'])
  }, [])
  return <SingaporeSvg width={400} />
}

export default Map
