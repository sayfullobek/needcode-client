import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export const Loader = () => {
	return (
		<Box
			sx={{
				width: '100%',
				height: '90vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<CircularProgress />
		</Box>
	)
}
