export interface IContact {
  name: string;
  phone: string;
  email: string;
  image: string;
}

export interface IApiContact extends IContact {
  id: string;
}

export interface IApiContacts {
  [id: string]: IApiContact;
}
