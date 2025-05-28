import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export const SourceCodeComp = ({ item }) => {
	return (
		<Card
			onClick={() => (window.location.href = item.link)}
			sx={{ width: '24%', height: '10vh', padding: '0' }}
		>
			<CardActionArea
				sx={{
					width: '100%',
					height: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<CardContent
					sx={{
						width: '100%',
						height: '100%',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Typography variant='h5' component='div'>
						{item.name}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	)
}
