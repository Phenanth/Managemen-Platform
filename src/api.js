import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.default.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/json'

const instance = axios.create()
instance.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
	if (localStorage.getItem('token')) {
		config.headers.Authorization = `token ${localStorage.getItem('token')}`
			.replace(/(^\")|(\"$)/g, '')
	}
	return config
}, err => {
	return Promise.reject(err)
})

instance.interceptors.response.use(response => {
	return response
}, err => {
	return Promise.reject(err)
})

export default {
	
	doLogin ( data ) {
		return instance.post('/api/login', data)
	},
	isLogin () {
		return instance.get('/api/isLogin')
	},
	getData ( data ) {
		return instance.post('/api/userData', data)
	},
	changePassword ( data ) {
		return instance.post('/api/changePassword', data)
	},
	teacherData ( data ) {
		return instance.post('/api/teacherData', data)
	},
	studentData ( data ) {
		return instance.post('/api/studentData', data)
	},
	myStudents ( data ) {
		return instance.post('/api/myStudents', data)
	},
	changeTutor ( data ) {
		return instance.post('/api/changeTutor', data)
	},
	checkStudent ( data ) {
		return instance.post('/api/checkStudent', data)
	},
	deleteUser( data ) {
		return instance.post('/api/deleteUser', data)
	},
	tutorDelete ( data ) {
		return instance.post('/api/tutorDelete', data)
	}

}
