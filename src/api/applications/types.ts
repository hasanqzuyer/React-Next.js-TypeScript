export type TCreateAsApplicationParams = {
  tier: string;
  houseId: number;
};

export type TSingleApplication = {
  id: number;
};

export interface IApplication {
  id: number;
  tier: string;
  status: string;
  ownerId: number | null;
  houseId: number | null;
}
