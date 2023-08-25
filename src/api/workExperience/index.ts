import Project from 'constants/project';
import { client } from 'api/api-client';

const HouseWorkExperienceApi = {
  createHouseWorkExperience: async (body: any) => {
    await client.post(`${Project.apis.v1}/work-experiences`, body);
  },

  getHouseWorkExperiences: async (filter: any) => {
    const { data } = await client.get(`${Project.apis.v1}/work-experiences`, {
      params: {
        filter,
      },
    });

    return data;
  },

  getHouseWorkExperience: async (id: number) => {
    const { data } = await client.get(
      `${Project.apis.v1}/work-experiences/${id}`
    );

    return data;
  },

  updateHouseWorkExperience: async (body: any, id: number) => {
    await client.patch(`${Project.apis.v1}/work-experiences/${id}`, body);
  },

  deleteHouseWorkExperience: async (id: number) => {
    await client.delete(`${Project.apis.v1}/work-experiences/${id}`);
  },
};

export default HouseWorkExperienceApi;
