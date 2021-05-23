import { apiHttp } from '../axiosApi.js'
import { evidencePath } from '../config/apiRoute.js'

export const postEvidence = (body) => apiHttp('POST', `${evidencePath}`, body)

export const putEvidence = (id, body) =>
  apiHttp('PUT', `${evidencePath}/${id}`, body)

export const getEvidences = () => apiHttp('GET', `${evidencePath}`)

export const deleteEvidence = (id) => apiHttp('DELETE', `${evidencePath}/${id}`)

export const uploadFile = async (file) => apiHttp('POST', `${evidencePath}/upload`, file)
