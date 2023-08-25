import { IUser } from "api/users/types";

export type TCreateAsSkillParams = {
  tier: string;
  houseId: number;
};

export type TSingleSkill = {
  id: number;
};

export interface ISkill {
  id: number;
  name: string;
  owner: IUser;
  createdAt: string;
  updatedAt: string;
}
