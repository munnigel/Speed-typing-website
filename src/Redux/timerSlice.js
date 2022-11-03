import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  timer: 15,
}

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    settingTimer: (state, action) => {
      state.timer = action.payload;
    }
  }
})

export const { settingTimer } = timerSlice.actions;

export default timerSlice.reducer;
