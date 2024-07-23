import { createSlice } from '@reduxjs/toolkit';
import type { IApiContact, IContact } from '../../types';
import { deleteContact, fetchContactInfo, fetchContacts } from './homeThunks';

export interface homeState {
  contacts: IApiContact[];
  contactInfo: IContact | null;
  isFetching: boolean;
  isContactFetching: boolean;
  isImageLoading: boolean;
  contactDeleting: boolean;
}

const initialState: homeState = {
  contacts: [],
  contactInfo: null,
  isFetching: false,
  isContactFetching: false,
  isImageLoading: true,
  contactDeleting: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchContacts.fulfilled, (state, { payload: contacts }) => {
        state.contacts = contacts;
        state.isFetching = false;
      })
      .addCase(fetchContacts.rejected, (state) => {
        state.isFetching = false;
      });

    builder
      .addCase(fetchContactInfo.pending, (state) => {
        state.contactInfo = null;
        state.isContactFetching = true;
      })
      .addCase(fetchContactInfo.fulfilled, (state, { payload: ApiContact }) => {
        state.contactInfo = ApiContact;
        state.isContactFetching = false;
      })
      .addCase(fetchContactInfo.rejected, (state) => {
        state.isContactFetching = false;
      });

    builder
      .addCase(deleteContact.pending, (state) => {
        state.contactDeleting = true;
      })
      .addCase(deleteContact.fulfilled, (state) => {
        state.contactDeleting = false;
      })
      .addCase(deleteContact.rejected, (state) => {
        state.contactDeleting = false;
      });
  },
  selectors: {
    selectIsContacts: (state) => state.contacts,
    selectIsFetching: (state) => state.isFetching,
    selectIsContactInfo: (state) => state.contactInfo,
    selectIsContactFetching: (state) => state.isContactFetching,
    selectContactDeleting: (state) => state.contactDeleting,
  },
});

export const homeReducer = homeSlice.reducer;
export const {
  selectIsContacts,
  selectIsFetching,
  selectIsContactFetching,
  selectIsContactInfo,
  selectContactDeleting,
} = homeSlice.selectors;
