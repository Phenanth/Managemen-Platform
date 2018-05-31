/* Vuex for token management. */
import api from '../../api.js'

const state = {
	token: null
}

const getters = {
	showTokenState: function (state) {
		if (state.token) {
			return state.token
		} else {
			return localStorage.getItem('token')
		}
		/*api.isLogin().then(({
			data
		}) => {
			if (data.success) {
				if (state.token) {
					return state.token
				} else {
					console.log(localStorage.getItem('token'))
					return localStorage.getItem('token')
				}
			} else {
				localStorage.removeItem('token')
				return null
			}
		})*/
	}
}

const actions = {
	storeToken: function ({ commit }, data) {
		commit('STORETOKEN', data)
	},
	logout: function ({ commit }) {
		commit('LOGOUT')
	}
}

const mutations = {
	STORETOKEN: function (state, data) {
		localStorage.setItem('token', data)
		state.token = data
	},
	LOGOUT: function (state) {
		localStorage.removeItem('token')
		console.log('In token.js: ' + localStorage.getItem('token'))
		state.token = null
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
