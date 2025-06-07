import AdbIcon from '@mui/icons-material/Adb'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetMe } from '../../config/service/AuthService'
import { DASHBOARD_URL } from '../../utils/Utils'

const pages = [
	{
		name: 'Kurslar',
		link: `${DASHBOARD_URL.mainCourse}`,
	},
	{
		name: 'Loyihalar',
		link: `${DASHBOARD_URL}`,
	},
	{
		name: 'Blog',
		link: `${DASHBOARD_URL}`,
	},
]
const settings = [
	{
		name: 'Dashboard',
		link: `${DASHBOARD_URL.dashboardStudent}`,
	},
	{
		name: 'Kurslar',
		link: `${DASHBOARD_URL.courseStudent}`,
	},
	{
		name: 'Chiqish',
		func: true,
	},
]

function Navbar() {
	const [anchorElNav, setAnchorElNav] = React.useState(null)
	const [anchorElUser, setAnchorElUser] = React.useState(null)
	const [user, setUser] = React.useState(null)
	const navigate = useNavigate()

	const handleOpenNavMenu = event => {
		setAnchorElNav(event.currentTarget)
	}
	const handleOpenUserMenu = event => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseNavMenu = () => {
		setAnchorElNav(null)
	}

	const handleCloseUserMenu = () => {
		setAnchorElUser(null)
	}

	const nowUser = async () => {
		const res = await GetMe()

		setUser(res)
	}

	const logOut = () => {
		localStorage.clear()
		nowUser()
	}

	useEffect(() => {
		nowUser()
	}, [])

	return (
		<AppBar
			position='fixed'
			sx={{
				backgroundColor: 'white',
				color: 'black',
			}}
		>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'black',
							textDecoration: 'none',
						}}
					>
						NEEDCODE
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{ display: { xs: 'block', md: 'none' } }}
						>
							{pages.map(page => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography
										onClick={() => navigate(page.link)}
										sx={{ textAlign: 'center' }}
									>
										{page.name}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='/'
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							color: 'black',
							textDecoration: 'none',
						}}
					>
						NEEDCODE
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map(page => (
							<Button
								key={page}
								onClick={() => {
									handleCloseNavMenu()
									navigate(page.link)
								}}
								sx={{ my: 2, color: 'black', display: 'block' }}
							>
								{page.name}
							</Button>
						))}
					</Box>
					<Box sx={{ flexGrow: 0 }}>
						{user ? (
							<Tooltip title='Open settings'>
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
								</IconButton>
							</Tooltip>
						) : (
							<Box>
								<Button
									variant='contained'
									onClick={() => navigate(`${DASHBOARD_URL.register}`)}
								>
									Register
								</Button>
								<Button
									variant='outlined'
									sx={{
										marginLeft: '10px',
									}}
									onClick={() => navigate(`${DASHBOARD_URL.login}`)}
								>
									Login
								</Button>
							</Box>
						)}
						<Menu
							sx={{ mt: '45px' }}
							id='menu-appbar'
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map(setting => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography
										sx={{ textAlign: 'center' }}
										onClick={() => {
											setting.func ? logOut() : navigate(setting.link)
										}}
									>
										{setting.name}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	)
}
export default Navbar
