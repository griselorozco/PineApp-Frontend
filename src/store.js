/* eslint-disable */
import Vue from "vue";
import Vuex from "vuex";
import router from "@/router";

import {
  loginApi,
  getUserById,
  editUser,
  changeImage,
  seguirPerfil,
  saveCard,
  removeCard,
  getDinero
} from "@/api/modules";
import { getFollows } from "./api/modules/user";

const URL_IMG = "http://localhost:3004/public/upload";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard-pro/assets/img/sidebar-1.jpg",
    drawer: null,
    token: "",
    usuario: "",
    perfil: "",
    rol: "",
    logueado: false,
    seguir: false,
    seguidos: [],
    seguidores: [],
    tarjetas: [],
    dinero: ""
  },
  getters: {
    usuarioGetter: state => state.usuario,
    perfilGetter: state => state.perfil,
    seguirGetter: state => state.seguir,
    seguidosGetter: state => state.seguidos,
    seguidoresGetter: state => state.seguidores,
    tarjetasGetter: state => state.tarjetas,
    dineroGetter: state => state.dinero
  },
  mutations: {
    obtener_usuario(state, payload) {
      state.token = payload;
      if (payload === "") {
        state.usuario = "";
        state.perfil = "";
        state.rol = "";
        state.token = "";
        state.logueado = false;
      } else {
        state.logueado = true;
        state.token = payload.token;
        state.usuario = payload.user;
        if (state.usuario)
          state.usuario.imagen =
            !payload.perfil || !payload.perfil.imagen
              ? "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              : `${URL_IMG}/${payload.perfil.imagen}`;
        state.perfil = payload.perfil;
        if (state.perfil) {
          state.perfil.imagen =
            !payload.perfil || !payload.perfil.imagen
              ? "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
              : `${URL_IMG}/${payload.perfil.imagen}`;
        }
        state.rol = payload.rol;
      }
    },
    set_usuario(state, payload) {
      state.usuario = payload.perfil;
      if (payload.usuario) state.usuario.correo = payload.usuario.correo;
      state.usuario.imagen =
        !payload.perfil.imagen || !payload.perfil
          ? "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
          : `${URL_IMG}/${payload.perfil.imagen}`;
    },
    set_seguir(state, payload) {
      state.seguir = payload;
    },
    set_seguidos(state, payload) {
      state.seguidos = payload;
    },
    set_seguidores(state, payload) {
      state.seguidores = payload;
    },
    set_tarjetas(state, payload) {
      state.tarjetas = payload;
    },
    add_seguidores(state) {
      state.seguidores.push(state.perfil);
    },
    remove_seguidores(state, id) {
      let index = state.seguidores.findIndex(index => index._id == id);
      state.seguidores.splice(index, 1);
    },
    set_dinero(state, payload) {
      state.dinero = payload;
    },

    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },
    SET_SCRIM(state, payload) {
      state.barColor = payload;
    }
  },
  actions: {
    async login_action({ commit }, payload) {
      const serviceResponse = await loginApi(payload);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        commit("obtener_usuario", serviceResponse);
        localStorage.setItem("token", serviceResponse.token);
        localStorage.setItem("rol", JSON.stringify(serviceResponse.rol));
        localStorage.setItem("perfil", JSON.stringify(serviceResponse.perfil));
        localStorage.setItem("logueado", true);
        router.push("/app");
        return serviceResponse;
      } else {
        return serviceResponse;
      }
    },
    logout_action({ commit }) {
      localStorage.clear();
      commit("obtener_usuario", "");
      router.push("/");
      return true;
    },
    leer_token({ commit }) {
      const token = localStorage.getItem("token");
      if (token) {
        const token = localStorage.getItem("token");
        const rol = JSON.parse(localStorage.getItem("rol"));
        // eslint-disable-next-line camelcase
        const perfil = JSON.parse(localStorage.getItem("perfil"));
        const payload = {
          rol: rol,
          perfil: perfil,
          token: token
        };
        commit("obtener_usuario", payload);
        // commit("set_usuario", payload);
      } else {
        commit("obtener_usuario", "");
        router.push({ name: "Login" });
      }
    },
    async getUserByIdAction({ commit }, id) {
      const serviceResponse = await getUserById(id);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        commit("set_usuario", serviceResponse);
        // commit("set_seguidos", serviceResponse.perfil.siguiendo);
        // commit("set_seguidores", serviceResponse.perfil.seguidores);
        commit("set_tarjetas", serviceResponse.perfil.tarjetas);
      } else {
        const params = { text: serviceResponse.message };
        window.getApp.$emit("SHOW_ERROR", params);
      }
    },
    async updatePerfil({ commit }, payload) {
      const serviceResponse = await editUser(payload.usuario_id, payload);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        commit("set_usuario", serviceResponse);
        return serviceResponse;
      } else {
        const params = { text: serviceResponse.message };
        window.getApp.$emit("SHOW_ERROR", params);
        return serviceResponse;
      }
    },
    async updateImagenPerfil({ commit }, payload) {
      const serviceResponse = await changeImage(payload);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        commit("set_usuario", serviceResponse);
        return serviceResponse;
      } else {
        const params = { text: serviceResponse.message };
        window.getApp.$emit("SHOW_ERROR", params);
        return serviceResponse;
      }
    },
    async seguirPerfil({ commit }, payload) {
      const serviceResponse = await seguirPerfil(payload);
      console.log(serviceResponse);
      if (serviceResponse) {
        commit("set_seguir", serviceResponse.seguir);
        if (serviceResponse.seguir) {
          commit("add_seguidores");
        } else {
          commit("remove_seguidores", payload);
        }
        return serviceResponse;
      } else {
        const params = { text: serviceResponse.message };
        window.getApp.$emit("SHOW_ERROR", params);
        return serviceResponse;
      }
    },
    async agregarTarjeta({ commit }, payload) {
      const serviceResponse = await saveCard(payload);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        commit("set_usuario", serviceResponse);
        commit("set_tarjetas", serviceResponse.perfil.tarjetas);
        return serviceResponse;
      } else {
        const params = { text: serviceResponse.message };
        window.getApp.$emit("SHOW_ERROR", params);
        return serviceResponse;
      }
    },
    async eliminarTarjeta({ commit }, payload) {
      console.log(payload);
      const serviceResponse = await removeCard(payload);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        commit("set_usuario", serviceResponse);
        commit("set_tarjetas", serviceResponse.perfil.tarjetas);
        return serviceResponse;
      } else {
        const params = { text: serviceResponse.message };
        window.getApp.$emit("SHOW_ERROR", params);
        return serviceResponse;
      }
    },
    async obtenerDinero({ commit }) {
      const serviceResponse = await getDinero();
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        if (!serviceResponse.dinero) commit("set_dinero", 0);
        else commit("set_dinero", serviceResponse.dinero.monto);
        return serviceResponse;
      } else {
        const params = { text: serviceResponse.message };
        window.getApp.$emit("SHOW_ERROR", params);
        return serviceResponse;
      }
    },
    async obtenerFollows({ commit }, id) {
      const serviceResponse = await getFollows(id);
      console.log(serviceResponse);
      if (serviceResponse.ok) {
        commit("set_seguidos", serviceResponse.perfil.siguiendo);
        commit("set_seguidores", serviceResponse.perfil.seguidores);
        return serviceResponse;
      } else {
        const params = { text: serviceResponse.message };
        window.getApp.$emit("SHOW_ERROR", params);
        return serviceResponse;
      }
    }
  }
});
