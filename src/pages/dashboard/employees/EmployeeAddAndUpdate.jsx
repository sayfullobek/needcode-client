import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AutoForm } from '../../../component/AutoForm'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet, AutoSave } from '../../../config/service/AppService'
import { EMPLOYEE_BREADCRUMP_ADD } from '../../../utils/BreadcrumpUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const EmployeeAddAndUpdate = () => {
	const id = useParams().id
	const [formData, setFormData] = useState({})
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const roles = [
		{ name: 'Admin', value: 'ADMIN' },
		{ name: "O'qituvchi", value: 'TEACHER' },
	]

	const getAll = async () => {
		try {
			if (id) {
				const res = await AutoGet(`${APP_API.employee}/${id}`)
				setFormData({
					firstName: res.user.firstName,
					lastName: res.user.lastName,
					email: res.user.email,
					role: res.user.role,
				})
			}
			setLoading(true)
		} catch (err) {}
	}

	useEffect(() => {
		getAll()
	}, [])

	const formFields = !id
		? [
				{
					name: 'firstName',
					label: 'Ismini kiriting',
					type: 'text',
					col: '49.5%',
				},
				{
					name: 'lastName',
					label: 'Familiyasini kiriting',
					type: 'text',
					col: '49.5%',
				},
				{
					name: 'email',
					label: 'Emailini kiriting',
					type: 'email',
					col: '49.5%',
				},
				{
					name: 'role',
					label: 'Rolini tanlang',
					type: 'select',
					col: '49.5%',
					arr: roles,
				},
				{
					name: 'password',
					label: 'Parolini kiriting',
					type: 'password',
					col: '49.5%',
				},
				{
					name: 'prePassword',
					label: 'Parolni tasdiqlash uchun qayta kiriting',
					type: 'password',
					col: '49.5%',
				},
			]
		: [
				{
					name: 'firstName',
					label: 'Ismini kiriting',
					type: 'text',
					col: '49.5%',
				},
				{
					name: 'lastName',
					label: 'Familiyasini kiriting',
					type: 'text',
					col: '49.5%',
				},
				{
					name: 'email',
					label: 'Emailini kiriting',
					type: 'email',
					col: '49.5%',
				},
				{
					name: 'role',
					label: 'Rolini tanlang',
					type: 'select',
					col: '49.5%',
					arr: roles,
				},
			]
	const handleSubmit = async formData => {
		if (!formData.firstName || formData.firstName.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Ismi bo'lishi shart.",
			})
		}
		if (!formData.lastName || formData.lastName.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Familiyasi bo'lishi shart.",
			})
		}
		if (!formData.email || formData.email.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Emaili bo'lishi shart.",
			})
		}
		if (!formData.role) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Roli bo'lishi shart.",
			})
		}

		if (!id) {
			if (!formData.password || formData.password.trim().length < 6) {
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: "Xatolik yuz berdi. Paroli bo'lishi shart. (6ta belgi va undan ko'p bo'lishi kerak)",
				})
			}
			if (formData.password != formData.prePassword) {
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: "Xatolik yuz berdi. Parol va tasdiqlash paroli bir xil bo'lishi shart!",
				})
			}
		}

		const data = new FormData()
		data.append('firstName', formData.firstName)
		data.append('lastName', formData.lastName)
		data.append('email', formData.email)
		if (!id) {
			data.append('role', formData.role)
			data.append('password', formData.password)
		}

		const res = await AutoSave(
			data,
			APP_API.employee,
			id ? id : '',
			navigate,
			DASHBOARD_URL.employee
		)
		if (res) {
			Swal.fire({ icon: 'success', title: 'Saqlandi!', timer: 1500 })
			setFormData({}) // 🔁 bu yerda formani tozalaymiz
		}
	}

	return loading ? (
		<Box sx={{ padding: '3rem', width: '100%' }}>
			<Breadcrump
				status={'back'}
				url={`/${DASHBOARD_URL.employee}`}
				arr={EMPLOYEE_BREADCRUMP_ADD}
			/>
			<Box sx={{ marginTop: '2rem', width: '100%' }}>
				<AutoForm
					fields={formFields}
					onSubmit={handleSubmit}
					formData={formData}
					setFormData={setFormData}
				/>
			</Box>
		</Box>
	) : (
		<Loader />
	)
}
