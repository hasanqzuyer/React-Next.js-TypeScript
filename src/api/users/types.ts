import { IApplication } from 'api/applications/types';
import { TEducation } from 'api/education/types';
import { THousePreference } from 'api/housePreference/types';
import { IHouse } from 'api/houses/types';
import { ISocialMedia } from 'api/socialMedia/types';
import { TWorkExperience } from 'api/workExperience/types';

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
  languages: string;
  skills: string;
  location: string;
  tokenBalance: number;
  applicationCount: number;
  applications: IApplication[];
  educations: TEducation[];
  experiences: TWorkExperience[];
  housePreference: THousePreference[];
  socialMedia: ISocialMedia[];
  houses: IHouse[];
  invested: number;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
