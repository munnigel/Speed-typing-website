import {configureStore} from '@reduxjs/toolkit';
import timerReducer from '../Redux/timerSlice';
import resultsReducer from '../Redux/resultsSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    results: resultsReducer,
  },
});