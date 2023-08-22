import { IApplication } from 'api/applications/types';

export type TCreateUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  locationId: string;
  role: string;
  status: string;
  isDeleted: boolean;
  currency: string;
  createAt: string;
  updatedAt: string;
};

export type TSingleUser = {
  id: string;
};

export type TAddComment = {
  comment: string;
};

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  dateOfBirth: string;
  nationality: string;
  profileImageUrl: string;
  language: string;
  location: string;
  tokenBalance: number;
  applications: IApplication[];
  invested: number;
  createdAt: string;
  updatedAt: string;
}
