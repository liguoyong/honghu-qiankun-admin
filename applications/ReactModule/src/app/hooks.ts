import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import { RootState, AppDispatch } from './store.ts'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppStore = () => useStore<RootState>()
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector