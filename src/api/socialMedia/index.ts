// eslint-disable-next-line import/no-named-as-default
import Project from 'constants/project';
import {
  TSingleSocialMedia,
  TCreateAsSocialMediaParams,
} from 'api/socialMedia/types';

import { client } from 'api/api-client';
import { IUser } from 'api/users/types';

const SocialMediaAPI = {
  registration: async (body: TCreateAsSocialMediaParams, locale: string) => {
    const { data } = await client.post(
      `${Project.apis.v1}/influencer/registration`,
      body,
      {
        params: {
          lang: locale,
        },
      }
    );
    return data;
  },

  registrationViaInvitation: async (body: TCreateAsSocialMediaParams) => {
    const { data } = await client.post(
      `${Project.apis.v1}/influencer/registrationViaInvitation`,
      body
    );
    return data;
  },

  getSocialMedias: async (filters: any) => {
    const { data } = await client.get(`${Project.apis.v1}/influencer`, {
      params: {
        ...filters,
      },
    });

    return data;
  },

  getDSocialMediasToBeApproved: async (filters: any) => {
    const { data } = await client.get(
      `${Project.apis.v1}/influencer/discoverSocialMedias?stage=toBeApproved`,
      {
        params: {
          ...filters,
        },
      }
    );

    return data;
  },

  getSingleSocialMedia: async (id: any): Promise<IUser> => {
    const { data } = await client.get(`${Project.apis.v1}/influencer/${id}`);

    return data;
  },

  deleteSocialMedia: async (id: TSingleSocialMedia) => {
    const { data } = await client.delete(`${Project.apis.v1}/influencer/${id}`);

    return data;
  },

  deleteManySocialMedias: async (body: any) => {
    const users = await client.patch(
      `${Project.apis.v1}/influencer/deleteSelectedUsers`,
      body
    );

    return users;
  },

  updateSocialMedia: async (body: any, id: any) => {
    const { data } = await client.patch(
      `${Project.apis.v1}/influencer/${id}`,
      body
    );

    return data;
  },

  // verifySocialMedia: async (body: any, id: TSingleSocialMedia) => {
  //   const { data } = await client.patch(
  //     `${Project.apis.v1}/influencer/${id}/verify`,
  //     body
  //   );
  // },

  influencerGetPostTypes: async (id: TSingleSocialMedia) => {
    const { data } = await client.get(
      `${Project.apis.v1}/influencer/${id}/desiredIncome/campaign/postTypes`
    );

    return data;
  },

  influencerGetDesiredIncome: async (id: TSingleSocialMedia) => {
    const { data } = await client.get(
      `${Project.apis.v1}/influencer/${id}/desiredIncome/campaign`
    );

    return data;
  },

  addCampaignDesiredIncome: async (userId: number, body: any[]) => {
    await client.put(
      `${Project.apis.v1}/influencer/${userId}/desiredIncome/campaign`,
      body
    );
  },

  influencerGetSurveyTypes: async (id: TSingleSocialMedia) => {
    const { data } = await client.get(
      `${Project.apis.v1}/influencer/${id}/desiredIncome/survey/surveyTypes`
    );

    return data;
  },

  influencerGetDesiredIncomeSurvey: async (id: TSingleSocialMedia) => {
    const { data } = await client.get(
      `${Project.apis.v1}/influencer/${id}/desiredIncome/survey`
    );

    return data;
  },

  addSurveyDesiredIncome: async (userId: number, body: any[]) => {
    await client.put(
      `${Project.apis.v1}/influencer/${userId}/desiredIncome/survey`,
      body
    );
  },
};

export default SocialMediaAPI;
