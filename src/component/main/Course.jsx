import { Box, Chip, Grid, InputBase, Rating, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import { GetMe } from '../../config/service/AuthService'
import { DASHBOARD_URL } from '../../utils/Utils'

const StyledCard = styled(Card)(({ theme }) => ({
	height: '500px',
	width: '350px',
	display: 'flex',
	flexDirection: 'column',
	transition: 'transform 0.2s',
	'&:hover': {
		transform: 'translateY(-4px)',
	},
	borderRadius: '16px',
	boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
}))

const TrailerButton = styled(Button)(({ theme }) => ({
	background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
	transition: 'all 0.3s',
	'&:hover': {
		transform: 'scale(1.05)',
		background: 'linear-gradient(45deg, #FF8E53 30%, #FE6B8B 90%)',
	},
}))

export default function Course() {
	const [course, setCourse] = useState([])
	const [user, setUser] = useState(null)
	const [expanded, setExpanded] = useState(false)
	const [liked, setLiked] = useState(false)
	const navigate = useNavigate()

	const handleShareClick = platform => {
		// Implement sharing functionality
		console.log(`Sharing on ${platform}`)
	}

	const getAll = async () => {
		const res = await AutoGet(`${APP_API.course}`)
		const nowUser = await GetMe()
		setUser(nowUser)

		console.log(nowUser)
		setCourse(res.data)
	}

	useEffect(() => {
		getAll()
	}, [])

	return (
		<Box sx={{ p: 10 }}>
			<Box
				sx={{
					marginLeft: '20px',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<Typography
					sx={{
						fontSize: '30px',
						borderLeft: '5px solid black',
						paddingLeft: '4px',
						marginTop: '20px',
					}}
				>
					Kurslar
				</Typography>
				<InputBase />
			</Box>
			<Grid container spacing={3} mt={5}>
				{course.map(movie => (
					<Grid item xs={12} sm={6} md={4} key={movie._id}>
						<StyledCard>
							<CardMedia
								component='img'
								height='200px'
								image={`${APP_API.upload}/${movie.photo}`}
								alt={movie.name}
								sx={{ objectFit: 'cover' }}
							/>
							<CardContent>
								<Typography variant='h5' gutterBottom component='div'>
									{movie.name}
								</Typography>
								<Typography
									variant='subtitle2'
									color='text.secondary'
									display='flex'
									alignItems='center'
									gutterBottom
								>
									Uqituvchi
									<Typography
										sx={{
											marginLeft: '5px',
											color: 'black',
										}}
									>
										{movie.teacher.firstName} {movie.teacher.lastName}
									</Typography>
								</Typography>
								<Rating value={4} precision={0.5} readOnly sx={{ mb: 1 }} />
								<Stack direction='row' spacing={1} sx={{ mb: 2 }}>
									{movie.learns.map(learn => (
										<Chip
											key={learn._id}
											label={learn.name}
											size='small'
											sx={{ borderRadius: '4px' }}
										/>
									))}
								</Stack>
								<Typography variant='body2' color='text.secondary' paragraph>
									{expanded ? movie.description : movie.description}
								</Typography>
								<Stack spacing={2}>
									<Button
										variant='outlined'
										onClick={() => setExpanded(!expanded)}
										aria-expanded={expanded}
										aria-label='read full review'
									>
										Kursni ulashish
									</Button>
									<TrailerButton
										variant='contained'
										fullWidth
										aria-label='watch trailer'
										onClick={() =>
											navigate(
												user?.role === 'STUDENT'
													? `/${DASHBOARD_URL.courseStudent}`
													: `${DASHBOARD_URL.register}`
											)
										}
									>
										Kursga o'tish
									</TrailerButton>
								</Stack>
							</CardContent>
						</StyledCard>
					</Grid>
				))}
			</Grid>
		</Box>
	)
}
