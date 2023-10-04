import { IApplication } from 'api/applications/types';
import { TDocument } from 'api/documents/types';
import { TImage } from 'api/images/types';
import { IUser } from 'api/users/types';

export type TCreateHouse = {
  name: string;
  location: string;
  totalSpots: number | null;
  availableSpots: number | null;
  rent: number | null;
  theme: string;
  info: string;
  currency: string;
  status: string;
  thumbnailId: number | null;
};

export type TSingleHouse = {
  id: number;
};

export interface IHouse {
  id: number;
  name: string;
  location: string;
  totalSpots: number | null;
  availableSpots: number | null;
  rent: number | null;
  theme: string;
  info: any;
  status: string;
  assignee: IUser | null;
  thumbnailId: number | null;
  currency: string;
  images: TImage[];
  documents: TDocument[];
  applications: IApplication[];
  createdAt: string;
  updatedAt: string;
}
