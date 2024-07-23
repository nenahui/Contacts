import { createSlice } from '@reduxjs/toolkit';
import type { IContact } from '../../types';
import { createContact, editContact, fetchContactInfoForEdit } from './contactFormThunks';

export interface ContactState {
  contactInfo: null | IContact;
  isLoading: boolean;
  isCreating: boolean;
  isEditing: boolean;
}

const initialState: ContactState = {
  contactInfo: null,
  isLoading: false,
  isCreating: false,
  isEditing: false,
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

    builder
      .addCase(editContact.pending, (state) => {
        state.isEditing = true;
      })
      .addCase(editContact.fulfilled, (state) => {
        state.isEditing = false;
      })
      .addCase(editContact.rejected, (state) => {
        state.isEditing = false;
      });
  },
  selectors: {
    selectIsCreating: (state) => state.isCreating,
    selectContactInfo: (state) => state.contactInfo,
    selectIsLoading: (state) => state.isLoading,
    selectIsEditing: (state) => state.isEditing,
  },
});

export const contactReducer = contactSlice.reducer;
export const { selectIsCreating, selectContactInfo, selectIsLoading, selectIsEditing } =
  contactSlice.selectors;
