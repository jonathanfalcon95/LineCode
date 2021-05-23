import { apiHttp } from '../axiosApi.js'
import {

  userPath, userLogin,

} from '../config/apiRoute.js'

export const createUsers = (body) =>
  apiHttp('POST', `${userPath}`, body)

export const editUsers = (userId, body) =>
  apiHttp('PUT', `${userPath}/${userId}`, body)

export const getUsers = () =>
  apiHttp('GET', `${userPath}`)

export const loginApi = (body) => {
  console.log(body)

  return apiHttp('POST', `${userLogin}`, body, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization: 'Basic ' + btoa(`${email}:${password}`),
    },
  })
}
