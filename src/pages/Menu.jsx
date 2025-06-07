import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Carausel from '../component/main/Carousel'
import Course from '../component/main/Course'

export const Menu = () => {
	const navigate = useNavigate()
	return (
		<Box>
			{/* <Box
				sx={{
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					overflow: 'auto',
				}}
			>
				<Box
					sx={{
						flexGrow: 1,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: '100vh',
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
			</Box> */}
			<Carausel />
			<Course />
		</Box>
	)
}
