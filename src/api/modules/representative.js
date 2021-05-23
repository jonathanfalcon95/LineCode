import { apiHttp } from '../axiosApi.js';
import { representativePath } from '../config/apiRoute.js';

export const postRepresentative = (body) => apiHttp('POST', `${representativePath}`, body);

export const putRepresentative = (id, body) =>
  apiHttp('PUT', `${representativePath}/${id}`, body);

export const getRepresentatives = () => apiHttp('GET', `${representativePath}`);
