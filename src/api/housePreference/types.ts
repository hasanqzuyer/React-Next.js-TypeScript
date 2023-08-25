import { IUser } from "api/users/types";

export type TAddHousePreference = {
  theme: string;
  skillsOfOthers: string;
  location: string;
  language: string;
  monthlyRentMax: number;
  monthlyRentMin: number;
  ageMax: number;
  ageMin: number;
  tenantsMax: number;
  tenantsMin: number;
  interestsHobbies: string;
  diet: string;
  motivation: string;
};

export type TSingleHousePreference = {
  id: number;
};

export type THousePreference = {
  id: number;
  theme: string;
  skillsOfOthers: string;
  location: string;
  language: string;
  monthlyRentMax: number;
  monthlyRentMin: number;
  ageMax: number;
  ageMin: number;
  tenantsMax: number;
  tenantsMin: number;
  interestsHobbies: string;
  diet: string;
  motivation: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
};
