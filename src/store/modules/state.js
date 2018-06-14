/* Vuex for state management. */

const state = {
	tutorState: ''
}

const getters = {
	showTutorState: function ( state ) {
		if (state.tutorState != '') {
			return state.tutorState
		} else {
			return localStorage.getItem('tutorState')
		}
	}
}

const actions = {
	changeTutorState: function ({ commit }, tutorState) {
		commit('CHANGETUTORSTATE', tutorState)
	}
}

const mutations = {
	CHANGETUTORSTATE: function ( state, tutorState ) {
		localStorage.removeItem('tutorState')
		localStorage.setItem('tutorState', tutorState)
		state.tutorState = tutorState
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
