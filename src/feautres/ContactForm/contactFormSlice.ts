import { createSlice } from '@reduxjs/toolkit';
import { createContact } from './contactFormThunks';

export interface ContactState {
  isLoading: boolean;
  isCreating: boolean;
}

const initialState: ContactState = {
  isLoading: false,
  isCreating: false,
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createContact.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createContact.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createContact.rejected, (state) => {
        state.isCreating = false;
      });
  },
  selectors: {
    selectIsCreating: (state) => state.isCreating,
  },
});

export const contactReducer = contactSlice.reducer;
export const { selectIsCreating } = contactSlice.selectors;
