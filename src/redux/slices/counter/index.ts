import {createSlice} from "@reduxjs/toolkit"


export const counterSlice = createSlice({
initialState:0,
name:'counter',
reducers:{
  increment:(state)=>state+1,
  decrement:(state)=>state-1, 
  incrementByCount:(state,action)=>state+action.payload,
  deacrementByCount:(state,action)=>state-action.payload,
  resetCount:(state)=>state=0,
}
})

export const {increment,decrement,incrementByCount,resetCount,deacrementByCount} = counterSlice.actions
export default counterSlice.reducer
