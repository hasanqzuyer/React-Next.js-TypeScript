export type TCreateAsSocialMediaParams = {
  tier: string;
  houseId: number;
};

export type TSingleSocialMedia = {
  id: number;
};

export interface ISocialMedia {
  id: number;
  instagram: string | null;
  linkedIn: string | null;
  tiktok: string | null;
  website: string | null;
}
