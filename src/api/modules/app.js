import { apiHttp } from '../axiosApi.js'
import { appPath } from '../config/apiRoute.js'

export const getAppToken = () => apiHttp('GET', `${appPath}/token`)
