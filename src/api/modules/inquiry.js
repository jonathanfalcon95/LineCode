import { apiHttp } from '../axiosApi.js';
import { inquiryPath } from '../config/apiRoute.js';

export const postInquiry = (body) => apiHttp('POST', `${inquiryPath}`, body);

export const putInquiry = (id, body) =>
  apiHttp('PUT', `${inquiryPath}/${id}`, body);

export const getInquiries = () => apiHttp('GET', `${inquiryPath}`);
