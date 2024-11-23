import { configureStore} from '@reduxjs/toolkit'
import counterReducer from './features/counterSlice'
import loginReducer from './features/loginState'
import userSlice from './features/userProfile'

export const store = configureStore({
    reducer:{
        counter: counterReducer,
        isloginState: loginReducer,
        userProfile: userSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

import { useDispatch, useSelector} from 'react-redux'
import type {TypedUseSelectorHook} from 'react-redux'

export const useAppDispatch:()=> AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
