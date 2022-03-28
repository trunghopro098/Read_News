import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState:{
        currentUser:null,
    },
    reducers:{
        updateUer: (state,action)=>{
            state.currentUser = action.payload;
        },
    }
})

export const { updateUer } = userSlice.actions;
export default userSlice.reducer;