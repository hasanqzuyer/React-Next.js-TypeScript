import Project from 'constants/project';
import { client } from 'api/api-client';

const HousePreferenceApi = {
  createHousePreference: async (body: any) => {
    await client.post(`${Project.apis.v1}/house-preferences`, body);
  },

  getHousePreferences: async (filter: any) => {
    const { data } = await client.get(`${Project.apis.v1}/house-preferences`, {
      params: {
        filter,
      },
    });

    return data;
  },

  getHousePreference: async (id: number) => {
    const { data } = await client.get(
      `${Project.apis.v1}/house-preferences/${id}`
    );

    return data;
  },

  updateHousePreference: async (body: any, id: number) => {
    await client.patch(`${Project.apis.v1}/house-preferences/${id}`, body);
  },

  deleteHousePreference: async (id: number) => {
    await client.delete(`${Project.apis.v1}/house-preferences/${id}`);
  },
};

export default HousePreferenceApi;
