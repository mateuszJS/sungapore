import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getWeatherKey } from '~/utils'
import { ForecastType } from '~/hooks/use-filter-state'

export type Weather = {
  id: number
  main: string
  description: string
  icon: string
}

export type Forecast = {
  current: {
    sunrise: number
    sunset: number
    temp: number
    pressure: number
    humidity: number
    weather: Weather[]
    maxTemp: number
    minTemp: number
  }
  [ForecastType.daily]: Array<{
    dt: number
    sunrise: number
    sunset: number
    weather: Weather[]
    temp: {
      min: number
      max: number
    }
  }>
  [ForecastType.hourly]: Array<{
    dt: number
    temp: number
    weather: Weather[]
  }>
}

type SuccessAction = PayloadAction<Forecast & { lat: number; lng: number }>

const forecastSlice = createSlice({
  name: 'forecast',
  initialState: {
    loading: false,
    error: null,
    data: {} as {
      [key: string]: Forecast
    },
  },
  reducers: {
    loading: (state) => {
      state.loading = true
      state.error = null
    },
    success: (state, { payload: { lat, lng, ...rest } }: SuccessAction) => {
      state.loading = false
      state.data[getWeatherKey(lat, lng)] = rest
    },
    error: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default forecastSlice
