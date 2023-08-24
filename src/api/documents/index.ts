import Project from 'constants/project';
import { TDocument, TDocumentId, TDocumentName } from 'api/documents/types';
import { client } from 'api/api-client';

const DocumentsAPI = {
  postDocument: async (body: TDocument) => {
    await client.post(`${Project.apis.v1}/documents`, body);
  },

  getDocuments: async () => {
    const { data } = await client.get(`${Project.apis.v1}/documents`);

    return data;
  },

  getDocumentById: async (id: TDocumentId) => {
    const { data } = await client.get(`${Project.apis.v1}/documents/${id}`);

    return data;
  },

  deleteDocument: async (id: TDocumentId) => {
    await client.delete(`${Project.apis.v1}/documents/${id}`);
  },
};

export default DocumentsAPI;
