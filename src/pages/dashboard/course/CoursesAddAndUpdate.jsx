import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AutoForm } from '../../../component/AutoForm'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet, AutoSave } from '../../../config/service/AppService'
import { COURSE_BREADCRUMP_ADD } from '../../../utils/BreadcrumpUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const CoursesAddAndUpdate = () => {
	const id = useParams().id
	const [formData, setFormData] = useState({})
	const navigate = useNavigate()
	const [learns, setLearns] = useState([])
	const [whoFor, setWhoFor] = useState([])
	const [teacher, setTeacher] = useState([])
	const [photo, setPhoto] = useState(false)

	const [loading, setLoading] = useState(false)
	const courseType = [
		{ name: 'Pulli', value: 'PRO' },
		{ name: 'Tekin', value: 'FREE' },
	]
	const courseMode = [
		{ name: 'Kurs', value: 'COURSE' },
		{ name: 'Loyiha', value: 'PROJECT' },
	]

	const getAll = async () => {
		try {
			if (id) {
				const res = await AutoGet(`${APP_API.course}/${id}`)
				const l = []
				res.learns.map(async item => l.push(item._id))
				const w = []
				res.whoFors.map(async item => w.push(item._id))
				setFormData({
					name: res.name,
					description: res.description,
					courseType: res.courseType,
					courseMode: res.courseMode,
					price: res.price,
					learns: l,
					whoFors: w,
					teacher: res.teacher._id,
				})
			}
			const learns = await AutoGet(`${APP_API.learn}?page=1&limit=1000`)
			setLearns(learns.data)

			const whoFor = await AutoGet(`${APP_API.whoFor}?page=1&limit=1000`)
			setWhoFor(whoFor.data)

			const teacher = await AutoGet(`${APP_API.employee}?page=1&limit=1000`)
			setTeacher(teacher.users)

			setLoading(true)
		} catch (err) {}
	}

	useEffect(() => {
		getAll()
	}, [])

	const formFields = !id
		? [
				{
					name: 'editPhotoSee',
					type: 'editPhotoSee',
					col: '50%',
				},
				{
					name: 'name',
					label: 'Kurs nomini kiriting',
					type: 'text',
					col: '49.5%',
				},
				{
					name: 'photo',
					label: 'Rasm kiriting',
					type: 'file',
					col: '49.5%',
				},
				{
					name: 'description',
					label: 'Izoh kiriting',
					type: 'textarea',
					col: '100%',
				},
				{
					name: 'price',
					label: 'Kurs narxini kiriting',
					type: 'number',
					col: '49.5%',
				},
				{
					name: 'courseType',
					label: 'Kurs turini kiriting',
					type: 'select',
					col: '49.5%',
					arr: courseType,
				},
				{
					name: 'courseMode',
					label: 'Kurs mode sini kiriting',
					type: 'select',
					col: '49.5%',
					arr: courseMode,
				},
				{
					name: 'learns',
					label: 'Kurs uchun texnologiya kiriting',
					type: 'multi-select',
					col: '49.5%',
					arr: learns,
				},
				{
					name: 'whoFors',
					label: 'Kurs kimlar uchunligini kiriting',
					type: 'multi-select',
					col: '49.5%',
					arr: whoFor,
				},
				{
					name: 'teacher',
					label: "O'qituvchini kiriting",
					type: 'select',
					col: '49.5%',
					arr: teacher,
				},
			]
		: [
				{
					name: 'name',
					label: 'Kurs nomini kiriting',
					type: 'text',
					col: '49.5%',
				},
				{
					name: 'description',
					label: 'Izoh kiriting',
					type: 'textarea',
					col: '100%',
				},
				{
					name: 'price',
					label: 'Kurs narxini kiriting',
					type: 'number',
					col: '49.5%',
				},
				{
					name: 'courseType',
					label: 'Kurs turini kiriting',
					type: 'select',
					col: '49.5%',
					arr: courseType,
				},
				{
					name: 'courseMode',
					label: 'Kurs mode sini kiriting',
					type: 'select',
					col: '49.5%',
					arr: courseMode,
				},
				{
					name: 'learns',
					label: 'Kurs uchun texnologiya kiriting',
					type: 'multi-select',
					col: '49.5%',
					arr: learns,
				},
				{
					name: 'whoFors',
					label: 'Kurs kimlar uchunligini kiriting',
					type: 'multi-select',
					col: '49.5%',
					arr: whoFor,
				},
				{
					name: 'teacher',
					label: "O'qituvchini kiriting",
					type: 'select',
					col: '49.5%',
					arr: teacher,
				},
			]
	const handleSubmit = async formData => {
		if (!id) {
			if (!formData.photo) {
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: "Xatolik yuz berdi. Rasm bo'lishi shart.",
				})
			}
		}
		if (!formData.name && formData.name.trim().length > 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Kurs nomi bo'lishi shart.",
			})
		}
		if (!formData.description && formData.description.trim().length > 2) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Xatolik yuz berdi. Izoh yozilishi shart shart!',
			})
		}
		if (!formData.price && formData.price < 0) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Kurs narxi bo'lishi shart.",
			})
		}
		if (!formData.courseType) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Xatolik yuz berdi. Kurs turi kiritilishi shart!',
			})
		}
		if (!formData.courseMode) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Xatolik yuz berdi. Kurs modi kiritilishi shart!',
			})
		}
		if (!formData.learns) {
			console.log(formData)
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Kurs texnologiyasi bo'lishi shart.",
			})
		}
		if (!formData.whoFors) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi. Kurs kimlar uchunligi bo'lishi shart.",
			})
		}
		if (!formData.teacher) {
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: "Xatolik yuz berdi.O'qituvchi tanlanishi shart.",
			})
		}

		const data = new FormData()
		if (!id) {
			data.append('photo', formData.photo)
		}
		data.append('name', formData.name)
		data.append('price', formData.price)
		data.append('description', formData.description)
		data.append('courseType', formData.courseType)
		data.append('courseMode', formData.courseMode)
		data.append('learns', formData.learns)
		data.append('whoFors', formData.whoFors)
		data.append('teacher', formData.teacher)

		const res = await AutoSave(
			data,
			APP_API.course,
			id ? id : '',
			navigate,
			`${DASHBOARD_URL.goCourse}/${id}`
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
				url={`/${DASHBOARD_URL.goCourse}/${id}`}
				arr={COURSE_BREADCRUMP_ADD}
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
