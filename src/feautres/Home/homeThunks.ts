import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';
import axiosApi from '../../axiosApi';
import type { IApiContact, IApiContacts, IContact } from '../../types';

export const fetchContacts = createAsyncThunk<IApiContact[], void, { state: RootState }>(
  'home/fetch',
  async () => {
    const { data: contacts } = await axiosApi.get<IApiContacts | null>('contacts.json');

    if (contacts === null) {
      return [];
    }

    return Object.keys(contacts).map((id) => ({
      ...contacts[id],
      id,
    }));
  }
);

export const fetchContactInfo = createAsyncThunk<IContact, string, { state: RootState }>(
  'home/fetchContactInfo',
  async (contactId) => {
    const { data } = await axiosApi.get(`contacts/${contactId}.json`);

    return data;
  }
);

export const deleteContact = createAsyncThunk<void, string, { state: RootState }>(
  'home/deleteContact',
  async (contactId) => {
    await axiosApi.delete(`contacts/${contactId}.json`);
  }
);
