import Project from 'constants/project';
import { TImage, TImageId, TImageName } from 'api/images/types';
import { client } from 'api/api-client';

const ImagesAPI = {

  postImage: async (body: TImage) => {
    await client.post(`${Project.apis.v1}/images`, body);
  },

  getImages: async () => {
    const { data } = await client.get(`${Project.apis.v1}/images`);

    return data;
  },

  getImageById: async (id: TImageId) => {
    const { data } = await client.get(`${Project.apis.v1}/images/${id}`);

    return data;
  },

  deleteImage: async (id: TImageId) => {
    await client.delete(`${Project.apis.v1}/images/${id}`);
  },
};

export default ImagesAPI;
