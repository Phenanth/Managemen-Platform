import Vue from 'vue'
import Vuex from 'vuex'
import token from './modules/token.js'
import tutorState from './modules/state.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		token,
		tutorState
	}
})
