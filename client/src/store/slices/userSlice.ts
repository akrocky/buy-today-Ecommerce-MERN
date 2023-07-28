import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
 type TUser= {
  userName:string;
  email:string;
  token:string;
  role:string;
  _id:string;
  }
export type TUserState ={
  user:TUser | null
}

// Define the initial state using that type
const initialState: TUserState   = {
  user: null
}

export const counterSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    userLogIn: (state,action: PayloadAction<TUserState >):void => {
      const {_id,userName,email,token,role}=action.payload.user as TUser
      console.log(action.payload.user);
      state.user={...state.user,_id,userName,email,token,role}
    },
    userLogOut: (state
      ) => {
     state.user=null;
    },
    
   
  },
})

export const {userLogIn,userLogOut} = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.user

export default counterSlice.reducer