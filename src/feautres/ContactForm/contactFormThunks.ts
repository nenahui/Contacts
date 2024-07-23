import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { IApiContact, IContact } from '../../types';

export const createContact = createAsyncThunk<void, IContact, { state: RootState }>(
  'contact/create',
  async (Contact) => {
    await axiosApi.post('contacts.json', Contact);
  }
);

export const editContact = createAsyncThunk<void, IApiContact, { state: RootState }>(
  'contact/edit',
  async (contact) => {
    await axiosApi.put(`contacts/${contact.id}.json`, contact);
  }
);
