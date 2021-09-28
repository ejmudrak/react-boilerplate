import getClient from './getClient';

export const client = getClient();

export enum Resource {
  Users = '/users',
}
