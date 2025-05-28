import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AutoForm } from '../../../component/AutoForm'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet, AutoSave } from '../../../config/service/AppService'
import { LESSON_BREADCRUMP_ADD } from '../../../utils/BreadcrumpUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const LessonAddAndUpdate = () => {
	const { courseId, moduleId, id } = useParams()
	const [formData, setFormData] = useState({})
	const navigate = useNavigate()

	const [loading, setLoading] = useState(false)
	const [video, setVideo] = useState(false)

	const getAll = async () => {
		try {
			if (id) {
				const res = await AutoGet(`${APP_API.lesson}/${id}`)
				setFormData({
					name: res.name,
					description: res.description,
					// imageUrl:
					// 	res.imageUrl instanceof Blob
					// 		? URL.createObjectURL(res.imageUrl)
					// 		: res.imageUrl,
				})
				setVideo(res.video)
			}
			setLoading(true)
		} catch (err) {}
	}

	useEffect(() => {
		getAll()
	}, [])

	const formFields = [
		// {
		// 	name: 'editPhotoSee',
		// 	type: 'editPhotoSee',
		// 	col: '50%',
		// },
		{ name: 'video', label: 'Video yuklang', type: 'video', col: '49.5%' },
		{ name: 'name', label: 'Nomi', type: 'text', col: '49.5%' },
		{ name: 'description', label: 'Tavsif', type: 'textarea', col: '100%' },
	]

	const handleSubmit = async formData => {
		if (id) {
			formData.video = video
		}
		if (!formData.video) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Video bo'lishi shart.",
			})
		}
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
		data.append('video', formData.video)
		data.append('name', formData.name)
		data.append('description', formData.description)
		data.append('module', moduleId)

		const res = await AutoSave(
			data,
			APP_API.lesson,
			id ? id : '',
			navigate,
			`${DASHBOARD_URL.goModule}/${courseId}/${moduleId}`
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
				url={`/${DASHBOARD_URL.goModule}/${courseId}/${moduleId}`}
				arr={LESSON_BREADCRUMP_ADD(courseId, 'Kurs', 'Modul', moduleId)}
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
