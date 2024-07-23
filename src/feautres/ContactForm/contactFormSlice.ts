import { createSlice } from '@reduxjs/toolkit';
import type { IContact } from '../../types';
import { createContact, fetchContactInfoForEdit } from './contactFormThunks';

export interface ContactState {
  contactInfo: null | IContact;
  isLoading: boolean;
  isCreating: boolean;
}

const initialState: ContactState = {
  contactInfo: null,
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

    builder
      .addCase(fetchContactInfoForEdit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContactInfoForEdit.fulfilled, (state, { payload: ApiContact }) => {
        state.isLoading = false;
        state.contactInfo = ApiContact;
      })
      .addCase(fetchContactInfoForEdit.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectIsCreating: (state) => state.isCreating,
    selectContactInfo: (state) => state.contactInfo,
    selectIsLoading: (state) => state.isLoading,
  },
});

export const contactReducer = contactSlice.reducer;
export const { selectIsCreating, selectContactInfo, selectIsLoading } = contactSlice.selectors;
