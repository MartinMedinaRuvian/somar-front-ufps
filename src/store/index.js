import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuarioCodigo: localStorage.getItem('usuarioCodigo') !== null ? localStorage.getItem('usuarioCodigo') : 0,
    usuarioNombre : localStorage.getItem('usuarioNombre') !== null ? localStorage.getItem('usuarioNombre') : '',
    usuarioTipo: localStorage.getItem('usuarioTipo') !== null ? localStorage.getItem('usuarioTipo') : ''
  },
  mutations: {
    obtenerCodigoUsuario(state, payload){   
      state.usuarioCodigo = payload;
    },
    obtenerNombreUsuario(state, payload){   
      state.usuarioNombre = payload;
    },
    obtenerTipoUsuario(state, payload){   
      state.usuarioTipo = payload;
    }
  },
  actions: {
    guardarUsuario({commit}, payload){
      const {codigo, username, tipo} = payload;
      commit('obtenerCodigoUsuario', codigo);
      commit('obtenerNombreUsuario', username);
      commit('obtenerTipoUsuario', tipo);
      localStorage.setItem('usuarioCodigo', codigo);
      localStorage.setItem('usuarioNombre', username);
      localStorage.setItem('usuarioTipo', tipo);
    },
    cerrarSesion({commit}){
      commit('obtenerCodigoUsuario', 0);
      commit('obtenerNombreUsuario', '');
      commit('obtenerTipoUsuario', '');
      localStorage.removeItem('usuarioCodigo');
      localStorage.removeItem('usuarioNombre');
      localStorage.removeItem('usuarioTipo');
      router.push({name: 'InicioSesion'});
    }
  },
  getters:{
    usuarioId(state){
      return state.usuarioCodigo
    },
    usuarioNombre(state){
      return state.usuarioNombre
    },
    usuarioTipo(state){
      return state.usuarioTipo
    }
  },
  modules: {
  }
})
