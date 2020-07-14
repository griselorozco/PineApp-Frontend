import { apiHttp } from '../axiosApi.js'
import {

    file,

} from '../config/apiRoute.js'

export const getFile = (typeFile, fileName) =>
  apiHttp('GET', `${file}${typeFile}/${fileName}`)
