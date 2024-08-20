// src/redux/languageSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the shape of the state
export interface LanguageState {
  language: string;
}

// Initial state
const initialState: LanguageState = {
  language: localStorage.getItem('language') || 'en', // default to English or saved language
};

// Create the slice
const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      localStorage.setItem('language', action.payload); // Persist language selection
    },
  },
});

// Export the actions
export const { setLanguage } = languageSlice.actions;

// Export the reducer
export default languageSlice.reducer;
