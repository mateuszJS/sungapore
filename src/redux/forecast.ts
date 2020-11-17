import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type DailyWeather = {
  description: string
  currTemp: string
  lowTemp: string
  highTemp: string
  humidity: string
  pressure: string
  sunriseTime: string
  sunsetTime: string
}

const forecastSlice = createSlice({
  name: 'forecast',
  initialState: {
    loading: false,
    error: null,
    data: {} as { [key: string]: DailyWeather },
  },
  reducers: {
    loading: (state) => {
      state.loading = true
      state.error = null
    },
    success: (
      state,
      { payload: { key, data } }: PayloadAction<{ data: DailyWeather; key: string }>,
    ) => {
      state.loading = false
      state.data[key] = data
    },
    error: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

export default forecastSlice
