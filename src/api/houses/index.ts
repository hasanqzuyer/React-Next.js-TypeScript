import Project from 'constants/project';
import { TCreateHouse } from 'api/houses/types';

import { client } from 'api/api-client';

const HouseAPI = {
  create: async (body: TCreateHouse) => {
    const { data } = await client.post(
      `${Project.apis.v1}/house-projects`,
      body
    );

    return data;
  },

  getAll: async (search?: string, marketType?: string, status?: string) => {
    const { data } = await client.get(`${Project.apis.v1}/house-projects`, {
      params: {
        search,
        marketType,
        status,
      },
    });

    return data;
  },

  updateHouse: async (body: any, id: number) => {
    await client.patch(`${Project.apis.v1}/house-projects/${id}`, body);
  },

  getOne: async (id: any) => {
    const { data } = await client.get(
      `${Project.apis.v1}/house-projects/${id}`
    );

    return data;
  },
};

export default HouseAPI;
