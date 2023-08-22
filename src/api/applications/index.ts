// eslint-disable-next-line import/no-named-as-default
import Project from 'constants/project';
import {
  TSingleApplication,
  TCreateAsApplicationParams,
} from 'api/applications/types';

import { client } from 'api/api-client';
import { IUser } from 'api/users/types';

const ApplicationAPI = {
  registration: async (body: TCreateAsApplicationParams, locale: string) => {
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

  registrationViaInvitation: async (body: TCreateAsApplicationParams) => {
    const { data } = await client.post(
      `${Project.apis.v1}/influencer/registrationViaInvitation`,
      body
    );
    return data;
  },

  getApplications: async (filters: any) => {
    const { data } = await client.get(`${Project.apis.v1}/influencer`, {
      params: {
        ...filters,
      },
    });

    return data;
  },

  getDApplicationsToBeApproved: async (filters: any) => {
    const { data } = await client.get(
      `${Project.apis.v1}/influencer/discoverApplications?stage=toBeApproved`,
      {
        params: {
          ...filters,
        },
      }
    );

    return data;
  },

  getSingleApplication: async (id: any): Promise<IUser> => {
    const { data } = await client.get(`${Project.apis.v1}/influencer/${id}`);

    return data;
  },

  deleteApplication: async (id: TSingleApplication) => {
    const { data } = await client.delete(`${Project.apis.v1}/influencer/${id}`);

    return data;
  },

  deleteManyApplications: async (body: any) => {
    const users = await client.patch(
      `${Project.apis.v1}/influencer/deleteSelectedUsers`,
      body
    );

    return users;
  },

  updateApplication: async (body: any, id: any) => {
    const { data } = await client.patch(
      `${Project.apis.v1}/influencer/${id}`,
      body
    );

    return data;
  },

  // verifyApplication: async (body: any, id: TSingleApplication) => {
  //   const { data } = await client.patch(
  //     `${Project.apis.v1}/influencer/${id}/verify`,
  //     body
  //   );
  // },

  influencerGetPostTypes: async (id: TSingleApplication) => {
    const { data } = await client.get(
      `${Project.apis.v1}/influencer/${id}/desiredIncome/campaign/postTypes`
    );

    return data;
  },

  influencerGetDesiredIncome: async (id: TSingleApplication) => {
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

  influencerGetSurveyTypes: async (id: TSingleApplication) => {
    const { data } = await client.get(
      `${Project.apis.v1}/influencer/${id}/desiredIncome/survey/surveyTypes`
    );

    return data;
  },

  influencerGetDesiredIncomeSurvey: async (id: TSingleApplication) => {
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

export default ApplicationAPI;
