import {
	AppBar,
	Box,
	Button,
	Container,
	Toolbar,
	Typography,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const Menu = () => {
	const navigate = useNavigate()
	return (
		<Box
			sx={{
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			{/* Navbar */}
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div'>
						Need Code
					</Typography>
				</Toolbar>
			</AppBar>

			{/* Body - Centered Buttons */}
			<Box
				sx={{
					flexGrow: 1,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Container
					sx={{
						display: 'flex',
						gap: 2,
						justifyContent: 'center',
						flexWrap: 'wrap',
					}}
				>
					<Button
						variant='contained'
						color='primary'
						size='large'
						onClick={() => navigate('auth/register')}
					>
						Ro'yxatdan o'tish
					</Button>
					<Button
						variant='outlined'
						color='secondary'
						size='large'
						onClick={() => navigate('/auth/login')}
					>
						Xisobga kirish
					</Button>
				</Container>
			</Box>
		</Box>
	)
}
