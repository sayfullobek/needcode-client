import {
	Box,
	Button,
	Container,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Modal,
	Rating,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'
import {
	FaArrowUp,
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaShieldAlt,
	FaTwitter,
} from 'react-icons/fa'

const StyledFooter = styled('footer')(({ theme }) => ({
	padding: theme.spacing(6, 0),
	position: 'relative',
	marginTop: 'auto',
}))

const SocialIcon = styled(IconButton)(({ theme }) => ({
	margin: theme.spacing(0, 1),
	transition: 'all 0.3s ease-in-out',
	'&:hover': {
		transform: 'translateY(-3px)',
	},
}))

const ScrollTopButton = styled(Button)(({ theme }) => ({
	position: 'fixed',
	bottom: theme.spacing(2),
	right: theme.spacing(2),
	borderRadius: '50%',
	minWidth: '48px',
	width: '48px',
	height: '48px',
}))

const FeedbackModal = styled(Modal)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const ModalContent = styled(Box)(({ theme }) => ({
	backgroundColor: theme.palette.background.paper,
	padding: theme.spacing(4),
	borderRadius: theme.spacing(1),
	maxWidth: 400,
	width: '90%',
}))

const Footer = () => {
	const [openFeedback, setOpenFeedback] = useState(false)
	const [rating, setRating] = useState(0)
	const theme = useTheme()
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

	const handleScrollTop = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	const quickLinks = ['About Us', 'Track Order', 'Delivery Areas', 'Contact Us']
	const services = [
		'Express Delivery',
		'International Shipping',
		'Business Solutions',
		'Return Policy',
	]
	const support = ['FAQs', 'Help Center', 'Terms of Service', 'Privacy Policy']

	return (
		<StyledFooter>
			<Container maxWidth='lg'>
				<Grid container spacing={4}>
					<Grid item xs={12} md={3}>
						<Box display='flex' alignItems='center' mb={2}>
							<FaShieldAlt
								size={24}
								style={{ marginRight: theme.spacing(1) }}
							/>
							<Typography variant='h6' component='h2'>
								Safe Contactless Delivery
							</Typography>
						</Box>
						<Typography variant='body2' color='textSecondary'>
							Ensuring your safety with zero-contact delivery options and
							sanitized handling of all packages.
						</Typography>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Typography variant='h6' gutterBottom>
							Quick Links
						</Typography>
						<List dense>
							{quickLinks.map(link => (
								<ListItem key={link} button>
									<ListItemText primary={link} />
								</ListItem>
							))}
						</List>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Typography variant='h6' gutterBottom>
							Services
						</Typography>
						<List dense>
							{services.map(service => (
								<ListItem key={service} button>
									<ListItemText primary={service} />
								</ListItem>
							))}
						</List>
					</Grid>

					<Grid item xs={12} sm={6} md={3}>
						<Typography variant='h6' gutterBottom>
							Support
						</Typography>
						<List dense>
							{support.map(item => (
								<ListItem key={item} button>
									<ListItemText primary={item} />
								</ListItem>
							))}
						</List>
					</Grid>
				</Grid>

				<Box
					mt={4}
					display='flex'
					flexDirection={isMobile ? 'column' : 'row'}
					justifyContent='space-between'
					alignItems={isMobile ? 'center' : 'flex-start'}
				>
					<Box mb={isMobile ? 2 : 0}>
						<Button
							variant='contained'
							color='primary'
							onClick={() => setOpenFeedback(true)}
						>
							Give Feedback
						</Button>
					</Box>

					<Box display='flex' justifyContent='center'>
						<SocialIcon aria-label='Facebook' color='primary'>
							<FaFacebook />
						</SocialIcon>
						<SocialIcon aria-label='Twitter' color='primary'>
							<FaTwitter />
						</SocialIcon>
						<SocialIcon aria-label='Instagram' color='primary'>
							<FaInstagram />
						</SocialIcon>
						<SocialIcon aria-label='LinkedIn' color='primary'>
							<FaLinkedin />
						</SocialIcon>
					</Box>
				</Box>

				<FeedbackModal
					open={openFeedback}
					onClose={() => setOpenFeedback(false)}
					aria-labelledby='feedback-modal'
				>
					<ModalContent>
						<Typography variant='h6' id='feedback-modal' gutterBottom>
							Share Your Feedback
						</Typography>
						<Rating
							value={rating}
							onChange={(event, newValue) => setRating(newValue)}
							size='large'
						/>
						<Box mt={2}>
							<Button
								fullWidth
								variant='contained'
								color='primary'
								onClick={() => setOpenFeedback(false)}
							>
								Submit
							</Button>
						</Box>
					</ModalContent>
				</FeedbackModal>

				<ScrollTopButton
					onClick={handleScrollTop}
					color='primary'
					variant='contained'
					aria-label='scroll to top'
				>
					<FaArrowUp />
				</ScrollTopButton>
			</Container>
		</StyledFooter>
	)
}

export default Footer
