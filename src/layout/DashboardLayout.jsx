import AutoStories from '@mui/icons-material/AutoStories'
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupAddIcon from '@mui/icons-material/GroupAdd'
import OutlinedFlagIcon from '@mui/icons-material/OutlinedFlag'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import SourceIcon from '@mui/icons-material/Source'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { createTheme } from '@mui/material/styles'
import { AppProvider } from '@toolpad/core/AppProvider'
import { DashboardLayout } from '@toolpad/core/DashboardLayout'
import { DemoProvider } from '@toolpad/core/internal'
import PropTypes from 'prop-types'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { GetMe } from '../config/service/AuthService'
import { DASHBOARD_URL } from '../utils/Utils'

const demoTheme = createTheme({
	colorSchemes: {
		light: {
			palette: {
				primary: { main: '#4caf50' },
			},
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
			palette: {
				primary: { main: '#66bb6a' },
			},
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
								backgroundColor: '#121212', // qora fon hover uchun
								color: '#000', // text oq qoladi
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
		values: {
			xs: 0,
			sm: 600,
			md: 600,
			lg: 1200,
			xl: 1536,
		},
	},
})

export const DashboardLayouts = props => {
	const { window } = props
	const navigate = useNavigate()
	const [role, setRole] = useState('')

	const [pathname, setPathname] = React.useState('/dashboard')
	const security = async () => {
		try {
			const res = await GetMe()
			if (res == undefined || res.role == undefined || res.role == '') {
				navigate('/')
			} else {
				setRole(res.role)
			}
		} catch (err) {}
	}
	useEffect(() => {
		security()
	}, [])
	const NAVIGATION =
		role === 'CEO' || role === 'ADMIN' || role === 'TEACHER'
			? [
					{
						segment: DASHBOARD_URL.dashboard,
						title: 'Dashboard',
						icon: <DashboardIcon htmlColor='green' />,
					},
					{
						segment: DASHBOARD_URL.course,
						title: 'Kurslar',
						icon: <AutoStories htmlColor='green' />,
					},
					{
						segment: DASHBOARD_URL.learn,
						title: 'Texnologiyalar',
						icon: <CollectionsBookmarkIcon htmlColor='green' />,
					},
					{
						segment: DASHBOARD_URL.whoFor,
						title: 'Kimlar uchun',
						icon: <GroupAddIcon htmlColor='green' />,
					},
					{
						segment: DASHBOARD_URL.sourceCode,
						title: 'Kod manbalari',
						icon: <SourceIcon htmlColor='green' />,
					},
					{
						segment: DASHBOARD_URL.employee,
						title: 'Hodimlar',
						icon: <PeopleAltIcon htmlColor='green' />,
					},
					{
						segment: DASHBOARD_URL.students,
						title: 'Foydalanuvchilar',
						icon: <PeopleAltIcon htmlColor='green' />,
					},
				]
			: role === 'STUDENT'
				? [
						{
							segment: DASHBOARD_URL.dashboardStudent,
							title: 'Dashboard',
							icon: <DashboardIcon htmlColor='green' />,
						},
						{
							segment: DASHBOARD_URL.courseStudent,
							title: 'Kurslar',
							icon: <AutoStories htmlColor='green' />,
						},
						{
							segment: DASHBOARD_URL.projectStudent,
							title: 'Loyihalar',
							icon: <AutoStories htmlColor='green' />,
						},
						{
							segment: DASHBOARD_URL.sourceCodeStudent,
							title: 'Kod manbalari',
							icon: <SourceIcon htmlColor='green' />,
						},
						{
							segment: DASHBOARD_URL.studentStartCourse,
							title: 'Boshlangan Kurslar',
							icon: <OutlinedFlagIcon htmlColor='green' />,
						},
					]
				: []
	const router = React.useMemo(() => {
		return {
			pathname,
			searchParams: new URLSearchParams(),
			navigate: path => {
				setPathname(String(path))
				navigate(path)
			},
		}
	}, [pathname])

	const demoWindow = window !== undefined ? window() : undefined

	return (
		<DemoProvider window={demoWindow}>
			<AppProvider
				navigation={NAVIGATION}
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
							<Typography variant='h6'>Need </Typography>
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
							<Typography variant='h6'> Code</Typography>
						</Box>
					),
					hideToolpadBranding: true,
				}}
			>
				<DashboardLayout defaultSidebarCollapsed>
					<Outlet />
				</DashboardLayout>
			</AppProvider>
		</DemoProvider>
	)
}

DashboardLayouts.propTypes = {
	window: PropTypes.func,
}
