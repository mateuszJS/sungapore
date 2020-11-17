import { configureStore } from '@reduxjs/toolkit'
import { useSelector as useGenericSelector, TypedUseSelectorHook } from 'react-redux'
export { useDispatch } from 'react-redux'
import citiesList from './citiesList'

export const citiesListActions = citiesList.actions

const store = configureStore({
  reducer: {
    citiesList: citiesList.reducer,
  },
})

type RootState = ReturnType<typeof store.getState>

export const useSelector: TypedUseSelectorHook<RootState> = useGenericSelector

export default store
