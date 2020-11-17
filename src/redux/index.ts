import { configureStore } from '@reduxjs/toolkit'
import { useSelector as useGenericSelector, TypedUseSelectorHook } from 'react-redux'
export { useDispatch } from 'react-redux'
import citiesList from './citiesList'
import forecast from './forecast'

export const citiesListActions = citiesList.actions
export const forecastActions = forecast.actions

const store = configureStore({
  reducer: {
    citiesList: citiesList.reducer,
    forecast: forecast.reducer,
  },
})

type RootState = ReturnType<typeof store.getState>

export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector

export default store
