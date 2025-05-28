import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	Divider,
	Grid,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../../component/Loader'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import { DASHBOARD_URL } from '../../utils/Utils'

export const OneCourse = () => {
	const status = useLocation().pathname.split('/')[2]
	const navigate = useNavigate()
	const [course, setCourse] = useState([])
	const [modules, setModules] = useState([])
	const [lessons, setLessons] = useState([])
	const [loading, setLoading] = useState(false)
	const id = useParams().id
	const getAll = async () => {
		try {
			const res = await AutoGet(`${APP_API.course}/${id}`)
			setCourse(res)
			const resModule = await AutoGet(`${APP_API.module}/${id}`)
			setModules(resModule.data)
			setLoading(true)
		} catch (err) {}
	}
	const getLessons = async moduleId => {
		try {
			const res = await AutoGet(
				`${APP_API.lesson}?moduleId=${moduleId}&page=1&limit=100`
			)
			setLessons(res.data)
		} catch (err) {}
	}
	useEffect(() => {
		getAll()
	}, [])
	return loading ? (
		<Box sx={{ p: 4 }}>
			{/* Kurs nomi */}
			<Typography variant='h4' fontWeight='bold' gutterBottom>
				{course.name}
			</Typography>

			{/* Kurs tavsifi */}
			<Typography variant='body1' color='text.secondary' mb={4}>
				{course.description}
			</Typography>
			<Divider sx={{ my: 4 }} />

			{/* O‘qituvchi */}
			<Box display='flex' alignItems='center' gap={2} mb={4}>
				<Avatar
					src='https://via.placeholder.com/150'
					sx={{ width: 64, height: 64 }}
				/>
				<Box>
					<Typography variant='subtitle1' fontWeight='bold'>
						Mentor: {course.teacher.firstName} {course.teacher.lastName}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						O'zbekistondagi o'z yo'nalishidagi eng zo'rlaridan
					</Typography>
				</Box>
			</Box>
			{/* Narx va tugma */}
			<Grid container spacing={2} alignItems='center' mb={4}>
				<Grid item>
					<Typography variant='h5' fontWeight='bold' sx={{ display: 'flex' }}>
						{course.courseType === 'FREE' ? (
							<del
								style={{ color: 'red', fontSize: '24px', marginRight: '.7rem' }}
							>
								{course.price}
							</del>
						) : (
							<Typography
								color='primary'
								sx={{ fontSize: '24px', marginRight: '.7rem' }}
							>
								{course.price}
							</Typography>
						)}{' '}
						so‘m
					</Typography>
				</Grid>
				<Grid item>
					<Button
						onClick={() =>
							navigate(
								`/${DASHBOARD_URL.dashboardStudent}/${status}/go-lessons/${id}/${modules[0]._id}/empty`
							)
						}
						variant='contained'
						color='primary'
						size='large'
					>
						Darsni boshlash
					</Button>
				</Grid>
			</Grid>

			<Box
				sx={{
					mb: 4,
					display: 'flex',
					width: '100%',
					justifyContent: 'space-between',
				}}
			>
				{/* Nimalarni o‘rganasiz */}
				<Card sx={{ p: '1rem', width: '49%' }}>
					<CardContent>
						<Typography variant='h6' color='primary'>
							Nimalarni o‘rganasiz
						</Typography>
						<ul>
							{course.learns.map(item => (
								<li>{item.name}</li>
							))}
						</ul>
					</CardContent>
				</Card>
				<Card sx={{ p: '1rem', width: '49%' }}>
					<CardContent>
						<Typography variant='h6' color='primary'>
							Kursda oq'ish uchun nimalarni bilish kerak
						</Typography>
						<ul>
							{course.whoFors.map(item => (
								<li>{item.name}</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</Box>

			{/* Modullar */}
			<Typography variant='h6' gutterBottom>
				Modullar va Darslar
			</Typography>

			{modules.map((module, index) => (
				<Accordion key={index} sx={{ p: '1rem' }}>
					<AccordionSummary
						onClick={() => getLessons(module._id)}
						sx={{ p: '1rem' }}
						expandIcon={<ExpandMoreIcon />}
					>
						<Typography>{module.name}</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<ul>
							{lessons.map((lesson, i) => (
								<li key={i}>{lesson.name}</li>
							))}
						</ul>
					</AccordionDetails>
				</Accordion>
			))}
		</Box>
	) : (
		<Loader />
	)
}
