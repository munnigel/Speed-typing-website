import {configureStore} from '@reduxjs/toolkit';
import timerReducer from '../Redux/timerSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
  },
});