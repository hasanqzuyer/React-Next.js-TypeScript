import Project from 'constants/project';
import { client } from 'api/api-client';

const DocumentApi = {
  fileUpload: async (file: File, houseId: number) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('houseId', houseId.toString());

    const { data } = await client.post(
      `${Project.apis.v1}/documents`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return data;
  },

  updateFile: async (body: any, id: number) => {
    await client.patch(`${Project.apis.v1}/documents/${id}`, body);
  },

  fileDelete: async (id: number) => {
    await client.delete(`${Project.apis.v1}/documents/${id}`);
  },

  fileDownload: async (id: string) => {
    const res = await client.get(`${Project.apis.v1}/documents/${id}`);

    return res;
  },
};

export default DocumentApi;
