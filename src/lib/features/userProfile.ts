import {createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserProfilePro {
    username: string
    userRolle: string
    userIndex: string
    userEmail: string
}

const initialState: UserProfilePro = {
    username:"",
    userRolle: "",
    userIndex: "",
    userEmail: "",
}

export const userSlice = createSlice({
    name:"UserProfile",
    initialState,
    reducers:{
        userProfileList: (state) => {
            state.username = state.username
            state.userRolle = state.userRolle
            state.userIndex = state.userIndex
            state.userEmail = state.userEmail
        },
        setUserProfile: (state, action:PayloadAction<UserProfilePro>) => {
            state.username = action.payload.username
            state.userRolle = action.payload.userRolle
            state.userIndex = action.payload.userIndex
            state.userEmail = action.payload.userEmail
        }
    }
})

export const { userProfileList, setUserProfile} = userSlice.actions

export default userSlice.reducer;