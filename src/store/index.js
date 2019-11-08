import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';
import user from './user'
import manage from './manage'
import loading from './loading'

Vue.use(Vuex)

const modules = {
  user: user,
  manage: manage,
  loading: loading
}

export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules: modules
})