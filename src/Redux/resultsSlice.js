import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [{
  accuracy: null,
  errors: null,
  wordErrors: null,
  totalTyped: null,
  wpm: null,
}];

export const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    addingResults: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(accuracy, errors, wordErrors, totalTyped, wpm) {
        return {
          payload: {
            id: nanoid(),
            accuracy,
            errors,
            wordErrors,
            totalTyped,
            wpm,
          }
        }
      }
    }
  }
})

export const { addingResults } = resultsSlice.actions;

export default resultsSlice.reducer;
