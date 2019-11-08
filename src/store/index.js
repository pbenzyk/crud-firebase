import Vue from 'vue'
import Vuex from 'vuex'
import pathify from 'vuex-pathify';
import user from './user'
import manage from './manage'

Vue.use(Vuex)

const modules = {
  user: user,
  manage:manage
}

export default new Vuex.Store({
  plugins: [pathify.plugin],
  modules: modules
})