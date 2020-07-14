/* eslint-disable */
import { apiHttp } from "../axiosApi.js";
import {
  userPath,
  userSave,
  loginPath,
  userImage,
  seguir,
  agregarTarjeta,
  eliminarTarjeta,
  dinero,
  obtenerFollows
} from "../config/apiRoute.js";

export const createUser = body => apiHttp("POST", `${userSave}`, body);

export const editUser = (userId, body) =>
  apiHttp("PUT", `${userSave}/${userId}`, body);

export const changeImage = body => apiHttp("POST", `${userImage}`, body);

export const saveCard = body => apiHttp("PUT", `${agregarTarjeta}`, body);

export const getDinero = () => apiHttp("GET", `${dinero}`);

export const pagar = () => apiHttp("PUT", `${dinero}`);

export const removeCard = id => apiHttp("DELETE", `${eliminarTarjeta}/${id}`);

export const getUserById = id => apiHttp("GET", `${userSave}/${id}`);

export const getUsersAll = () => apiHttp("GET", `${userSave}`);

export const getUsers = () => apiHttp("GET", `${userPath}`);

export const seguirPerfil = id => apiHttp("GET", `${seguir}/${id}`);

export const getFollows = id => apiHttp("GET", `${obtenerFollows}/${id}`);

export const loginApi = body => {
  return apiHttp("POST", `${loginPath}`, body);
};

export const consultarDinero = () => {
  return apiHttp("GET", `dinero`);
};
