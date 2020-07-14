import { apiHttp } from '../axiosApi.js'
import {

    dineroAll,

} from '../config/apiRoute.js'

export const getDineroAll = () =>
  apiHttp('GET', `${dineroAll}`)
