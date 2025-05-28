import BarChartIcon from '@mui/icons-material/BarChart'
import DescriptionIcon from '@mui/icons-material/Description'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme } from '@mui/material/styles'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { DemoProvider } from '@toolpad/core/internal'
import PropTypes from 'prop-types'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from '../../component/Loader'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import { GetMe } from '../../config/service/AuthService'
import { DASHBOARD_URL } from '../../utils/Utils'

const demoTheme = createTheme({
	colorSchemes: {
		light: {
			palette: { primary: { main: '#4caf50' } },
			components: {
				MuiListItemButton: {
					styleOverrides: {
						root: {
							'&.Mui-selected': {
								backgroundColor: '#C8E6C9',
								color: '#ffffff',
								'& .MuiSvgIcon-root': { color: '#ffffff' },
							},
							'&.Mui-selected:hover': {
								backgroundColor: '#A5D6A7',
							},
							'&:hover': {
								backgroundColor: '#E8F5E9',
							},
						},
					},
				},
			},
		},
		dark: {
			palette: { primary: { main: '#66bb6a' } },
			components: {
				MuiListItemButton: {
					styleOverrides: {
						root: {
							'&.Mui-selected': {
								backgroundColor: '#2e7d32',
								color: '#ffffff',
								'& .MuiSvgIcon-root': { color: '#ffffff' },
							},
							'&.Mui-selected:hover': {
								backgroundColor: '#388e3c',
							},
							'&:hover': {
								backgroundColor: '#121212',
								color: '#000',
								'& .MuiSvgIcon-root': { color: '#000' },
							},
						},
					},
				},
			},
		},
	},
	cssVariables: {
		colorSchemeSelector: 'data-toolpad-color-scheme',
	},
	breakpoints: {
		values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 },
	},
})

export const GoLessons = ({ window }) => {
	const { status, id, moduleId, lessonId } = useParams()
	const navigate = useNavigate()

	const [course, setCourse] = useState({})
	const [modules, setModules] = useState([])
	const [lesson, setLesson] = useState({})
	const [loading, setLoading] = useState(false)
	const [navigation, setNavigation] = useState([])
	const [pathname, setPathname] = useState(
		`/dashboard/${status}/go-lessons/${id}/${moduleId}`
	)

	// Lessonlarni olish
	const getLessons = async moduleId => {
		try {
			const res = await AutoGet(
				`${APP_API.lesson}?moduleId=${moduleId}&page=1&limit=100`
			)
			return res.data.map(lesson => ({
				segment: `${DASHBOARD_URL.dashboardStudent}/${status}/go-lessons/${id}/${moduleId}/${lesson._id}`,
				title: lesson.name,
				icon: <DescriptionIcon htmlColor='green' />,
			}))
		} catch {
			return []
		}
	}

	// Asosiy malumotlarni olish va navigation yasash
	const fetchAll = async () => {
		try {
			const me = await GetMe()
			if (!me?.role) return navigate('/')

			const courseRes = await AutoGet(`${APP_API.course}/${id}`)
			setCourse(courseRes)

			const modulesRes = await AutoGet(`${APP_API.module}/${id}`)
			setModules(modulesRes.data)

			const navItems = await Promise.all(
				modulesRes.data.map(async mod => ({
					title: mod.name,
					icon: <BarChartIcon htmlColor='green' />,
					children: await getLessons(mod._id),
				}))
			)

			setNavigation(navItems)
			setLoading(true)
		} catch (err) {
			console.error('Xatolik:', err)
		}
	}

	// Bitta darsni olish
	const fetchOneLesson = async () => {
		try {
			const res = await AutoGet(`${APP_API.lesson}/one/${lessonId}`)
			setLesson(res)
		} catch (err) {
			console.error('Darsni olishda xatolik:', err)
		}
	}

	useEffect(() => {
		if (lessonId !== 'empty') {
			fetchOneLesson()
		}
		fetchAll()
	}, [lessonId])

	const router = useMemo(
		() => ({
			pathname,
			searchParams: new URLSearchParams(),
			navigate: path => {
				setPathname(String(path))
				navigate(path)
			},
		}),
		[pathname]
	)

	const demoWindow = window?.()

	if (!loading) return <Loader />

	return (
		<DemoProvider window={demoWindow}>
			<AppProvider
				navigation={navigation}
				router={router}
				theme={demoTheme}
				window={demoWindow}
				branding={{
					logo: (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								color: 'green',
								fontWeight: 'bold',
							}}
						>
							<Typography variant='h6'>{course.name}</Typography>
						</Box>
					),
					title: (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								color: 'green',
								fontWeight: 'bold',
							}}
						>
							<Typography variant='h6'>ga Xush kelibsiz</Typography>
						</Box>
					),
					hideToolpadBranding: true,
				}}
			>
				<DashboardLayout defaultSidebarCollapsed>
					{lessonId === 'empty' || !lesson ? (
						<Typography>Darsliklarni ko'rish uchun tanlang</Typography>
					) : (
						<Box
							sx={{
								width: '100%',
								height: '90vh',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<video
								style={{ width: '70%', height: '80vh' }}
								controls
								src={`${APP_API.upload}/${lesson.video}`}
							/>
						</Box>
					)}
				</DashboardLayout>
			</AppProvider>
		</DemoProvider>
	)
}

GoLessons.propTypes = {
	window: PropTypes.func,
}
