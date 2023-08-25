// eslint-disable-next-line import/no-named-as-default
import Project from 'constants/project';
import { TSingleSkill } from 'api/skills/types';

import { client } from 'api/api-client';
import { IUser } from 'api/users/types';

const SkillAPI = {
  getSkills: async (filters: any) => {
    const { data } = await client.get(`${Project.apis.v1}/skills`, {
      params: {
        ...filters,
      },
    });

    return data;
  },

  getSingleSkill: async (id: any): Promise<IUser> => {
    const { data } = await client.get(`${Project.apis.v1}/skills/${id}`);

    return data;
  },

  deleteSkill: async (id: TSingleSkill) => {
    const { data } = await client.delete(`${Project.apis.v1}/skills/${id}`);

    return data;
  },
};

export default SkillAPI;
