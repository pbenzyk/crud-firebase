import axios from 'axios'
import _ from 'lodash'
import { make } from 'vuex-pathify'
const state = {
    loading: false
}
const getters = {

}

const mutations = make.mutations(state)

const actions = {
    async loadingOn() {
        state.loading = true
        console.log('loadingOn')
    },
    async loadingOff() {
        state.loading = false
        console.log('loadingOff')
    },

}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}