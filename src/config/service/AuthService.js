import { jwtDecode } from 'jwt-decode'
import Swal from 'sweetalert2'
import { DASHBOARD_URL } from '../../utils/Utils'
import { APP_API, BASE_CONFIG } from '../BaseConfig'

export const LoginHandler = async (data, navigate) => {
	try {
		const res = await BASE_CONFIG.doLogin(APP_API.login, data)
		localStorage.setItem('token', res.data.token)

		Swal.fire({
			title: 'Yaxshi',
			text: res.data.message,
			icon: 'success',
		})

		navigate(`/${DASHBOARD_URL.dashboard}`)
	} catch (err) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: err?.response?.data?.message || 'Nomaʼlum xatolik yuz berdi',
		})
	}
}

export const RegisterHandler = async (data, navigate) => {
	try {
		const res = await BASE_CONFIG.doLogin(APP_API.register, data)
		localStorage.setItem('token', res.data.token)

		Swal.fire({
			title: 'Yaxshi',
			text: res.data.message,
			icon: 'success',
		})

		navigate(`/${DASHBOARD_URL.dashboard}`)
	} catch (err) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: err?.response?.data?.message || 'Nomaʼlum xatolik yuz berdi',
		})
	}
}

export const GetMe = async () => {
	try {
		const res = await BASE_CONFIG.getMe(
			jwtDecode(localStorage.getItem('token')).id
		)
		return res.data
	} catch (err) {}
}
