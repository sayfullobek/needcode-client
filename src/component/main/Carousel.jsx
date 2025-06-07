import {
	Box,
	Button,
	IconButton,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { styled } from '@mui/system'
import { useCallback, useEffect, useState } from 'react'
import { CiCircleChevLeft, CiCircleChevRight } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import { GetMe } from '../../config/service/AuthService'
import { DASHBOARD_URL } from '../../utils/Utils'

const CarouselContainer = styled(Box)(({ theme }) => ({
	position: 'relative',
	width: '100%',
	height: '85vh',
	overflow: 'hidden',
}))

const SlidesContainer = styled(Box)(({ theme }) => ({
	display: 'flex',
	height: '100%',
	transition: 'transform 0.5s ease-in-out',
}))

const Slide = styled(Box)(({ theme }) => ({
	flex: '0 0 100%',
	position: 'relative',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	padding: theme.spacing(4),
	color: '#fff',
	'&::before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.6))',
		zIndex: 1,
	},
}))

const TextContent = styled(Box)(({ theme }) => ({
	position: 'relative',
	zIndex: 2,
	maxWidth: '600px',
	margin: '0 auto',
	textAlign: 'center',
}))

const NavigationButton = styled(IconButton)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	transform: 'translateY(-50%)',
	zIndex: 3,
	color: '#fff',
	transition: 'all 0.3s ease',
	'&:hover': {
		transform: 'translateY(-50%) scale(1.1)',
	},
}))

const Carousel = () => {
	const [courses, setCourses] = useState([])
	const [user, setUser] = useState(null)
	const [currentSlide, setCurrentSlide] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
	const navigate = useNavigate()

	const nextSlide = useCallback(() => {
		setCurrentSlide(prev => (prev + 1) % (courses.length + 1))
	}, [courses.length])

	const prevSlide = useCallback(() => {
		setCurrentSlide(
			prev => (prev - 1 + (courses.length + 1)) % (courses.length + 1)
		)
	}, [courses.length])

	useEffect(() => {
		const getAll = async () => {
			try {
				setIsLoading(true)
				const res = await AutoGet(`${APP_API.course}`)
				const nowUser = await GetMe()
				setUser(nowUser)
				setCourses(res.data || [])
				setIsLoading(false)
			} catch (error) {
				console.error('Error fetching data:', error)
				setCourses([])
				setIsLoading(false)
			}
		}

		getAll()

		// Auto-rotation interval
		const interval = setInterval(() => {
			setCurrentSlide(prev => (prev + 1) % (courses.length + 1))
		}, 8000)

		return () => clearInterval(interval)
	}, [courses.length])

	// Handle keyboard navigation
	useEffect(() => {
		const handleKeyPress = event => {
			if (event.key === 'ArrowLeft') {
				prevSlide()
			} else if (event.key === 'ArrowRight') {
				nextSlide()
			}
		}

		window.addEventListener('keydown', handleKeyPress)
		return () => window.removeEventListener('keydown', handleKeyPress)
	}, [nextSlide, prevSlide])

	if (isLoading) {
		return (
			<CarouselContainer>
				<SlidesContainer sx={{ transform: `translateX(0%)` }}>
					<Slide
						sx={{
							backgroundImage: `url(https://cdn.hashnode.com/res/hashnode/image/upload/v1737567904804/e1f89c98-9264-40e4-8183-f230b2bac811.png)`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						<TextContent>
							<Typography
								variant={isMobile ? 'h4' : 'h3'}
								component='h2'
								gutterBottom
								sx={{
									fontWeight: 'bold',
									textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
								}}
							>
								Loading courses...
							</Typography>
						</TextContent>
					</Slide>
				</SlidesContainer>
			</CarouselContainer>
		)
	}

	// Combine default slide with courses
	const allSlides = [
		{
			id: 'default',
			photo:
				'https://cdn.hashnode.com/res/hashnode/image/upload/v1737567904804/e1f89c98-9264-40e4-8183-f230b2bac811.png',
			name: 'NeedCode online learning platform',
			description: "Zamonaviy kasblarni biz bilan o'rganing",
			button: "Ro'yxatdan o'tish",
			link: `${DASHBOARD_URL.register}`,
		},
		...courses,
	]

	return (
		<CarouselContainer role='region' aria-label='Courses Carousel'>
			<SlidesContainer
				sx={{ transform: `translateX(-${currentSlide * 100}%)` }}
			>
				{allSlides.map((slide, index) => (
					<Slide
						key={slide.id || index}
						sx={{
							backgroundImage: `url(${
								typeof slide.photo === 'string' &&
								slide.photo.startsWith('http')
									? slide.photo
									: `${APP_API.upload}/${slide.photo}`
							})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center',
						}}
					>
						<TextContent>
							<Typography
								variant={isMobile ? 'h4' : 'h3'}
								component='h2'
								gutterBottom
								sx={{
									fontWeight: 'bold',
									textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
								}}
							>
								{slide.name}
							</Typography>
							<Typography
								variant='body1'
								sx={{
									fontSize: isMobile ? '1rem' : '1.2rem',
									textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
								}}
							>
								{slide.description}
							</Typography>
							{slide.button && slide.link ? (
								<Button
									variant='contained'
									color='secondary'
									onClick={() => navigate(slide.link)}
									sx={{
										marginTop: '20px',
									}}
								>
									{slide.button}
								</Button>
							) : (
								<Button
									variant='contained'
									color='success'
									onClick={() =>
										navigate(
											user?.role === 'STUDENT'
												? `${DASHBOARD_URL.courseStudent}`
												: `${DASHBOARD_URL.register}`
										)
									}
									sx={{
										marginTop: '20px',
									}}
								>
									Kursga O'tish
								</Button>
							)}
						</TextContent>
					</Slide>
				))}
			</SlidesContainer>

			{allSlides.length > 1 && (
				<>
					<NavigationButton
						onClick={prevSlide}
						sx={{ left: theme.spacing(2) }}
						aria-label='Previous slide'
					>
						<CiCircleChevLeft size={isMobile ? 32 : 48} />
					</NavigationButton>

					<NavigationButton
						onClick={nextSlide}
						sx={{ right: theme.spacing(2) }}
						aria-label='Next slide'
					>
						<CiCircleChevRight size={isMobile ? 32 : 48} />
					</NavigationButton>
				</>
			)}
		</CarouselContainer>
	)
}

export default Carousel
