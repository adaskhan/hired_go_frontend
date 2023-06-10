import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: { username: null, first_name: null, last_name: null },
  reducers: {
    saveUserHomepageData: (state, action) => {
      state.username = action.payload.username;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
    },
  }
})

export const { saveUserHomepageData } = userSlice.actions;

export default userSlice.reducer;
