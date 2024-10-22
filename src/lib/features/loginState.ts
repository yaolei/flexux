import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface LoginStatePro {
    isLogin: boolean
}

const initialState: LoginStatePro = {
    isLogin: false
}

export const lgoinSlice = createSlice({
    name:"isloginState",
    initialState,
    reducers:{
      loginToggle:(state) => {
        state.isLogin = !state.isLogin;
      },
      setLoginToggle : (state, action:PayloadAction<boolean>) => {
        state.isLogin = action.payload
      }
    }
})

export const { loginToggle, setLoginToggle} = lgoinSlice.actions
export default lgoinSlice.reducer;