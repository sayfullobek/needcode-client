import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AutoForm } from '../../../component/AutoForm'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet, AutoSave } from '../../../config/service/AppService'
import { MODULE_BREADCRUMP_ADD } from '../../../utils/BreadcrumpUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const ModuleAddAndUpdate = () => {
	const { id, courseId } = useParams()
	const [formData, setFormData] = useState({})
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)

	const getAll = async () => {
		try {
			if (id) {
				const res = await AutoGet(`${APP_API.module}/one/${id}`)
				setFormData({
					name: res.data.name,
					description: res.data.description,
				})
			}
			setLoading(true)
		} catch (err) {}
	}

	useEffect(() => {
		getAll()
	}, [])

	const formFields = [
		{ name: 'name', label: 'Nomi', type: 'text', col: '100%' },
		{ name: 'description', label: 'Tavsif', type: 'textarea', col: '100%' },
	]

	const handleSubmit = async formData => {
		if (!formData.name || formData.name.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Nomi bo'lishi shart.",
			})
		}
		if (!formData.description || formData.description.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Tavsif bo'lishi shart.",
			})
		}

		const data = new FormData()
		data.append('name', formData.name)
		data.append('description', formData.description)
		data.append('course', courseId)
		const res = await AutoSave(
			data,
			APP_API.module,
			id ? id : '',
			navigate,
			`${DASHBOARD_URL.goCourse}/${courseId}`
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
				url={`/${DASHBOARD_URL.goCourse}/${courseId}`}
				arr={MODULE_BREADCRUMP_ADD(courseId)}
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
