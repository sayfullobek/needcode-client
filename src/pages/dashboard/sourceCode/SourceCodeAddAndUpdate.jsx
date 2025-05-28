import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AutoForm } from '../../../component/AutoForm'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet, AutoSave } from '../../../config/service/AppService'
import { SOURCE_CODE_BREADCRUMP_ADD } from '../../../utils/BreadcrumpUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const SourceCodeAddAndUpdate = () => {
	const id = useParams().id
	const [formData, setFormData] = useState({})
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)

	const getAll = async () => {
		try {
			if (id) {
				const res = await AutoGet(`${APP_API.sourceCode}/${id}`)
				setFormData({
					name: res.data.name,
					description: res.data.description,
					link: res.data.link,
				})
			}
			setLoading(true)
		} catch (err) {}
	}

	useEffect(() => {
		getAll()
	}, [])

	const formFields = [
		{ name: 'name', label: 'Nomi', type: 'text', col: '49.5%' },
		{ name: 'link', label: 'Linki', type: 'url', col: '49.5%' },
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
		if (!formData.link || formData.link.trim().length < 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Linki bo'lishi shart.",
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
		data.append('link', formData.link)
		const res = await AutoSave(
			data,
			APP_API.sourceCode,
			id ? id : '',
			navigate,
			DASHBOARD_URL.sourceCode
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
				url={`/${DASHBOARD_URL.sourceCode}`}
				arr={SOURCE_CODE_BREADCRUMP_ADD}
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
