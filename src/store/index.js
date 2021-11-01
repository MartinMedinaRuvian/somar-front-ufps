import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario : null
  },
  mutations: {
    obtenerUsuario(state, payload){   
      state.usuario = payload;
    }
  },
  actions: {
    guardarUsuario({commit}, payload){
      commit('obtenerUsuario', payload)
    },
    cerrarSesion({commit}){
      commit('obtenerUsuario', null);
      router.push({name: 'InicioSesion'});
    },
  },
  getters:{
    usuario(state){
      return state.usuario
    }
  },
  modules: {
  }
})
