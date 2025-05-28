import Swal from 'sweetalert2'
import { BASE_CONFIG } from '../BaseConfig'

export const AutoSave = async (data, api, id, navigate, url) => {
	try {
		let res
		if (id === '') {
			res = await BASE_CONFIG.doPost(api, data)
		} else {
			res = await BASE_CONFIG.doPut(`${api}/${id}`, data)
			navigate(`/${url}`)
		}
		Swal.fire({
			title: 'Yaxshi',
			text: res.data.message,
			icon: 'success',
		})
		return res.data.success
	} catch (err) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: err?.response?.data?.message || 'Nomaʼlum xatolik yuz berdi',
		})
	}
}

export const SendReq = async (data, api) => {
	try {
		const res = await BASE_CONFIG.doReq(api, data)
		Swal.fire({
			title: 'Yaxshi',
			text: res.data.message,
			icon: 'success',
		})
	} catch (err) {
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: err?.response?.data?.message || 'Nomaʼlum xatolik yuz berdi',
		})
	}
}

export const AutoDelete = async (api, id, getAll, pathName) => {
	Swal.fire({
		title: "O'chirasizmi?",
		text: "O'chirishga tayyormisiz!",
		icon: 'warning',
		showCancelButton: true,
		confirmButtonColor: 'green',
		cancelButtonColor: '#d33',
		cancelButtonText: 'Yopish',
		confirmButtonText: "Xa o'chiraman!",
	}).then(async result => {
		if (result.isConfirmed) {
			try {
				const res = await BASE_CONFIG.doDelete(`${api}/${id}`)
				Swal.fire({
					title: 'Yaxshi',
					text: res.data.message,
					icon: 'success',
				})
				const page = Number.parseInt(
					localStorage.getItem(`start-page-${pathName}`)
				)
				const rowsPerPage = localStorage.getItem(`limit-page-${pathName}`)
				await getAll(page, rowsPerPage)
				return res.data.success
			} catch (err) {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: err?.response?.data?.message || 'Nomaʼlum xatolik yuz berdi',
				})
			}
		}
	})
}

export const AutoGet = async api => {
	try {
		const res = await BASE_CONFIG.doGet(api)
		return res.data
	} catch (err) {}
}
