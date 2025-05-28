import AddCircleIcon from '@mui/icons-material/AddCircle'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import { Button } from '@mui/material'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'

function handleClick(event) {
	event.preventDefault()
	console.info('You clicked a breadcrumb.')
}

export const Breadcrump = ({ status, url, arr, backUrl }) => {
	const navigate = useNavigate()
	return (
		<Grid container sx={{ display: 'flex', justifyContent: 'space-between' }}>
			<div role='presentation' onClick={handleClick}>
				<Breadcrumbs aria-label='breadcrumb'>
					{arr.map(item =>
						item.primary ? (
							<Typography sx={{ color: 'text.primary' }}>
								{item.name}
							</Typography>
						) : (
							<Typography
								underline='hover'
								color='inherit'
								sx={{ cursor: 'pointer' }}
								onClick={() => navigate(item.url)}
							>
								{item.name}
							</Typography>
						)
					)}
				</Breadcrumbs>
			</div>
			<div>
				{status === 'add' ? (
					<Button
						onClick={() => navigate(url)}
						variant='contained'
						color='success'
					>
						<AddCircleIcon />
					</Button>
				) : status === 'addAndBack' ? (
					<>
						<Button
							variant='contained'
							color='error'
							sx={{ margin: '0 1rem' }}
							onClick={() => navigate(backUrl)}
						>
							<KeyboardReturnIcon />
						</Button>
						<Button
							onClick={() => navigate(url)}
							variant='contained'
							color='success'
						>
							<AddCircleIcon />
						</Button>
					</>
				) : status === 'back' ? (
					<Button
						variant='contained'
						color='error'
						onClick={() => navigate(url)}
					>
						<KeyboardReturnIcon />
					</Button>
				) : (
					<></>
				)}
			</div>
		</Grid>
	)
}
