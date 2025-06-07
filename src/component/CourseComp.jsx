import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useLocation, useNavigate } from 'react-router-dom'
import { APP_API } from '../config/BaseConfig'
import { DASHBOARD_URL } from '../utils/Utils'

export const CourseComp = ({ item }) => {
	const navigate = useNavigate()
	const path = useLocation().pathname.split('/')[2]
	console.log(item, path)
	return (
		<Card
			onClick={() =>
				navigate(
					`/${path === 'course' ? DASHBOARD_URL.courseStudent : DASHBOARD_URL.projectStudent}/${item.course?._id ? item.course?._id : item._id}`
				)
			}
			sx={{ width: '24%', height: '42vh' }}
		>
			<CardActionArea sx={{ width: '100%', height: '100%' }}>
				<CardMedia
					component='img'
					sx={{ height: '80%' }}
					width='100%'
					image={`${APP_API.upload}/${item.course?.photo ? item.course?.photo : item.photo}`}
					alt={item.name}
				/>
				<CardContent sx={{ height: '20%' }}>
					<Typography gutterBottom variant='h5' component='div'>
						{item.course?.name ? item.course?.name : item.name}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
