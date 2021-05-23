import { apiHttp } from '../axiosApi.js'
import {

    dispatchAll,

} from '../config/apiRoute.js'

export const getAllDispatch = () =>
    apiHttp('GET', `${dispatchAll}`)
