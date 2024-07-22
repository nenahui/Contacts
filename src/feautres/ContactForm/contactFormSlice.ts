import { createSlice } from '@reduxjs/toolkit';
import type { IContact } from '../../types';
import { createContact } from './contactFormThunks';

export interface ContactState {
  contacts: IContact[];
  isLoading: boolean;
  isCreating: boolean;
}

const initialState: ContactState = {
  contacts: [],
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
