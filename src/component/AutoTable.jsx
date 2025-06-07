// AutoTable.jsx
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import {
	Button,
	IconButton,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { APP_API } from '../config/BaseConfig'
import { AutoDelete } from '../config/service/AppService'
import { DASHBOARD_URL } from '../utils/Utils'

export const AutoTable = ({
	data,
	fields,
	onEdit,
	url,
	deleteUrl,
	getAll,
	pathName,
	goModule,
}) => {
	const navigate = useNavigate()
	return (
		<TableContainer
			component={Paper}
			sx={{ marginTop: '1rem', padding: '2rem' }}
		>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>Tartib</TableCell>
						{fields.map(field => (
							<TableCell key={field.name}>{field.label}</TableCell>
						))}
						{pathName != `/${DASHBOARD_URL.course}` ? (
							<TableCell>Amallar</TableCell>
						) : (
							<TableCell>Batafsil</TableCell>
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.map((row, index) => (
						<TableRow key={index}>
							<TableCell key={'tr'}>{index + 1}</TableCell>
							{fields.map(field =>
								field.name === 'imageUrl' ? (
									<TableCell key={field.name}>
										<img
											style={{
												width: '50px',
												height: '50px',
												borderRadius: '50%',
											}}
											src={row[field.name]}
											alt=''
										/>
									</TableCell>
								) : field.name === 'teacher' ? (
									<TableCell key={field.name}>
										{row[field.name].firstName} {row[field.name].lastName}
									</TableCell>
								) : field.name === 'description' ? (
									<TableCell key={field.name}>
										<Button
											variant='contained'
											sx={{ marginRight: '1rem' }}
											color='primary'
											onClick={() =>
												Swal.fire({
													title: row.description,
													showClass: {
														popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
													},
													hideClass: {
														popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
													},
												})
											}
										>
											<IconButton>
												<RemoveRedEyeIcon />
											</IconButton>
										</Button>
									</TableCell>
								) : field.name === 'video' ? (
									<TableCell key={field.name}>
										<Button
											variant='contained'
											sx={{ marginRight: '1rem' }}
											color='primary'
											onClick={() =>
												Swal.fire({
													title: `<video style="width:100%;" src="${APP_API.upload}/${row.video}" controls>
													</video>`,
													showClass: {
														popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
													},
													hideClass: {
														popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
													},
												})
											}
										>
											<IconButton>
												<RemoveRedEyeIcon />
											</IconButton>
										</Button>
									</TableCell>
								) : field.name === 'go' ? (
									<TableCell key='goPage'>
										<Button
											variant='contained'
											sx={{ marginRight: '1rem' }}
											color='secondary'
											onClick={() => navigate(`${goModule}/${row._id}`)}
										>
											<IconButton>
												<RemoveRedEyeIcon />
											</IconButton>
										</Button>
									</TableCell>
								) : (
									<TableCell key={field.name}>{row[field.name]}</TableCell>
								)
							)}
							{pathName != `/${DASHBOARD_URL.course}` &&
							pathName != `/${DASHBOARD_URL.students}` ? (
								<TableCell>
									<Button
										variant='contained'
										sx={{ marginRight: '1rem' }}
										color='warning'
										onClick={() => navigate(`/${url}/${row._id}`)}
									>
										<IconButton onClick={() => onEdit(row)}>
											<EditIcon />
										</IconButton>
									</Button>
									<Button
										onClick={() =>
											AutoDelete(deleteUrl, row._id, getAll, pathName)
										}
										variant='contained'
										color='error'
									>
										<IconButton>
											<DeleteIcon />
										</IconButton>
									</Button>
								</TableCell>
							) : (
								<TableCell key='goPage'>
									<Button
										variant='contained'
										sx={{ marginRight: '1rem' }}
										color='primary'
										onClick={() =>
											navigate(`/${DASHBOARD_URL.goCourse}/${row._id}`)
										}
									>
										<IconButton>
											<RemoveRedEyeIcon />
										</IconButton>
									</Button>
								</TableCell>
							)}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
