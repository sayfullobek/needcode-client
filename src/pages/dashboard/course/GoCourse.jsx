import {
	Box,
	Button,
	Card,
	CardContent,
	CardMedia,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AutoTable } from '../../../component/AutoTable'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { APP_API } from '../../../config/BaseConfig'
import { AutoDelete, AutoGet } from '../../../config/service/AppService'
import { MODULE_BREADCRUMP } from '../../../utils/BreadcrumpUtils'
import { MODULE_HEAD } from '../../../utils/TableHeadUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Pagination } from '../../../component/Pagination'

export const GoCourse = () => {
	const { id } = useParams()
	const [course, setCourse] = useState(null)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const [search, setSearch] = useState('')
	const [searchField, setSearchField] = useState('name') // default: name
	const [data, setData] = useState([])
	const [totalItems, setTotalItems] = useState(0)
	const [forSearch, setForSearch] = useState([])
	const [filteredData, setFilteredData] = useState([])
	const pathName = useLocation().pathname

	const getAll = async (page = 1, limit = 10) => {
		try {
			const res = await AutoGet(
				`${APP_API.module}/${id}?page=${page}&limit=${limit}`
			)
			setData(res.data)
			setTotalItems(res.totalItems)

			const searchs = await AutoGet(
				`${APP_API.module}/${id}?page=1&limit=${res.totalItems}`
			)
			setForSearch(searchs.data)
			const res1 = await AutoGet(`${APP_API.course}/${id}`)
			setCourse(res1)
			setLoading(true) // tugagach false
		} catch (err) {}
	}

	useEffect(() => {
		getAll()
	}, [id])

	const handleDelete = async () => {
		await AutoDelete(APP_API.course, id, getAll, pathName)
	}

	useEffect(() => {
		const timer = setTimeout(() => {
			if (search.trim().length === 0) {
				setFilteredData([])
			} else {
				const filtered = forSearch.filter(item =>
					(item[searchField] || '')
						.toLowerCase()
						.includes(search.trim().toLowerCase())
				)
				setFilteredData(filtered)
			}
		}, 1000)

		return () => clearTimeout(timer)
	}, [search, searchField, forSearch])

	const getLabel = () => {
		switch (searchField) {
			case 'name':
				return 'Nomi bo‘yicha qidirish...'
			case 'description':
				return 'Tavsifi bo‘yicha qidirish...'
			default:
				return 'Qidirish...'
		}
	}

	const exportToExcel = () => {
		const exportData = search.trim().length === 0 ? forSearch : filteredData
		const worksheet = XLSX.utils.json_to_sheet(exportData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'ModuleData')

		const excelBuffer = XLSX.write(workbook, {
			bookType: 'xlsx',
			type: 'array',
		})
		const dataBlob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		})
		saveAs(dataBlob, 'module.xlsx')
	}

	const handleEdit = () => {
		navigate(`/${DASHBOARD_URL.courseUpdate}/${id}`)
	}

	if (!loading) return <Loader />

	return (
		<Box sx={{ padding: 4 }}>
			<Card sx={{ display: 'flex', gap: 4, padding: 3, width: '100%' }}>
				<CardMedia
					component='img'
					sx={{ width: '30%', height: '100%', borderRadius: 2 }}
					image={course?.imageUrl || '/no-image.png'}
					alt={course?.name}
				/>
				<CardContent sx={{ flex: 1, display: 'flex' }}>
					<div style={{ width: '50%' }}>
						<Stack direction='row' spacing={2} mb={4}>
							<Button variant='contained' color='warning' onClick={handleEdit}>
								Tahrirlash
							</Button>
							<Button variant='outlined' color='error' onClick={handleDelete}>
								O‘chirish
							</Button>
						</Stack>
						<Typography variant='h4' gutterBottom>
							{course?.name}
						</Typography>
						<Typography variant='body1' gutterBottom>
							{course?.description}
						</Typography>

						<Stack spacing={1}>
							<Typography>
								<b>Narxi:</b> {course?.price} so‘m
							</Typography>
							<Typography>
								<b>Kurs turi:</b> {course?.courseType}
							</Typography>
							<Typography>
								<b>Kurs rejimi:</b> {course?.courseMode}
							</Typography>
							<Typography>
								<b>O‘qituvchi:</b> {course?.teacher?.firstName}{' '}
								{course?.teacher?.lastName}
							</Typography>
							<Typography>
								<b>O‘quvchilar soni:</b> {course?.studentSize}
							</Typography>
							<Typography>
								<b>Boshlanish sanasi:</b>{' '}
								{new Date(course?.startDate).toLocaleDateString()}
							</Typography>
						</Stack>
					</div>
					<div>
						<Typography>
							<h1>Nimalar o'rganishi</h1>{' '}
							{course?.learns.map(item => (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: '1rem',
									}}
								>
									<img
										width={'80px'}
										height={'80px'}
										style={{ borderRadius: '50%' }}
										src={`
										${APP_API.upload + '/' + item.photo}`}
										alt=''
									/>
									<p style={{ marginLeft: '2rem' }}>{item.name}</p>
								</div>
							))}
						</Typography>
						<Typography>
							<h1>Nimalar o'rganishi</h1>{' '}
							{course?.whoFors.map(item => (
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										marginBottom: '1rem',
									}}
								>
									<p style={{ marginLeft: '2rem' }}>{item.name}</p>
								</div>
							))}
						</Typography>
					</div>
				</CardContent>
			</Card>
			<Box sx={{ width: '100%', marginTop: '2.4rem' }}>
				<Breadcrump
					status={'add'}
					url={`/${DASHBOARD_URL.moduleAdd}/${id}`}
					arr={MODULE_BREADCRUMP}
				/>
				<Box
					sx={{
						display: 'flex',
						gap: 2,
						alignItems: 'center',
						flexWrap: 'wrap',
						mt: 2,
					}}
				>
					<FormControl sx={{ minWidth: 200 }}>
						<InputLabel id='search-field-label'>Filter turi</InputLabel>
						<Select
							labelId='search-field-label'
							value={searchField}
							label='Filter turi'
							onChange={e => setSearchField(e.target.value)}
						>
							<MenuItem value='name'>Nomi</MenuItem>
							<MenuItem value='description'>Tavsifi</MenuItem>
						</Select>
					</FormControl>

					<FormControl sx={{ flexGrow: 1, minWidth: 250 }}>
						<TextField
							label={getLabel()}
							type='search'
							value={search}
							onChange={e => setSearch(e.target.value)}
							variant='outlined'
							fullWidth
						/>
					</FormControl>
					<Button
						variant='contained'
						color='success'
						onClick={exportToExcel}
						sx={{ height: '56px' }}
					>
						Excelga saqlash
					</Button>
				</Box>
				<AutoTable
					data={
						search.trim().length === 0
							? data
							: filteredData.length > 0
								? filteredData
								: []
					}
					fields={MODULE_HEAD}
					url={`${DASHBOARD_URL.moduleUpdate}/${id}`}
					deleteUrl={APP_API.module}
					getAll={getAll}
					pathName={pathName}
					goModule={`/${DASHBOARD_URL.goModule}/${id}`}
				/>
				<Pagination totalItems={totalItems} getAll={getAll} />
			</Box>
		</Box>
	)
}
