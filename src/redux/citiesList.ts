import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type City = {
  lat: number
  lng: number
  name: string
  region: string
}

const citiesListSlice = createSlice({
  name: 'counter',
  initialState: {
    loading: false,
    error: null,
    data: [] as City[],
  },
  reducers: {
    loading: (state) => {
      state.loading = true
      state.data = []
      state.error = null
    },
    success: (state, { payload }: PayloadAction<City[]>) => {
      state.loading = false
      state.data = payload
    },
    error: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

// export const { loading, success, error } = citiesListSlice.actions

export default citiesListSlice
