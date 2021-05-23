import { apiHttp } from '../axiosApi.js';
import { warehousePath } from '../config/apiRoute.js';

export const postWarehouse = (body) => apiHttp('POST', `${warehousePath}`, body);

export const putWarehouse = (id, body) =>
  apiHttp('PUT', `${warehousePath}/${id}`, body);

export const getWarehouses = () => apiHttp('GET', `${warehousePath}`);
