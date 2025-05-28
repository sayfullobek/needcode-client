import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { AutoTable } from '../../../component/AutoTable'
import { Breadcrump } from '../../../component/Breadcrump'
import { Loader } from '../../../component/Loader'
import { Pagination } from '../../../component/Pagination'
import { APP_API } from '../../../config/BaseConfig'
import { AutoGet } from '../../../config/service/AppService'
import { COURSE_BREADCRUMP } from '../../../utils/BreadcrumpUtils'
import { COURSE_HEAD } from '../../../utils/TableHeadUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const Courses = () => {
	const [search, setSearch] = useState('')
	const [searchField, setSearchField] = useState('name') // default: name
	const [data, setData] = useState([])
	const [totalItems, setTotalItems] = useState(0)
	const [forSearch, setForSearch] = useState([])
	const [loading, setLoading] = useState(false)
	const [filteredData, setFilteredData] = useState([])
	const pathName = useLocation().pathname

	const getAll = async (page = 1, limit = 10) => {
		try {
			const res = await AutoGet(`${APP_API.course}?page=${page}&limit=${limit}`)
			setData(res.data)
			setTotalItems(res.totalItems)
			const searchs = await AutoGet(
				`${APP_API.course}?page=1&limit=${res.totalItems}`
			)
			setForSearch(searchs.data)
			setLoading(true)
		} catch (err) {}
	}

	useEffect(() => {
		getAll()
	}, [])

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
			case 'startDate':
				return "Boshlangan vaqt bo'yicha qidirish..."
			case 'course':
				return "Narxi bo'yicha qidirish..."
			case 'teacher':
				return "Ustozi bo'yicha qidirish..."
			default:
				return 'Qidirish...'
		}
	}

	const exportToExcel = () => {
		const exportData = search.trim().length === 0 ? forSearch : filteredData
		const worksheet = XLSX.utils.json_to_sheet(exportData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'CourseData')

		const excelBuffer = XLSX.write(workbook, {
			bookType: 'xlsx',
			type: 'array',
		})
		const dataBlob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		})
		saveAs(dataBlob, 'course.xlsx')
	}

	return loading ? (
		<Box sx={{ padding: '3rem' }}>
			<Breadcrump
				status={'add'}
				url={`/${DASHBOARD_URL.courseAdd}`}
				arr={COURSE_BREADCRUMP}
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
						<MenuItem value='startDate'>Boshlangan vaqti</MenuItem>
						<MenuItem value='price'>Narxi</MenuItem>
						<MenuItem value='teacher'>Ustozi</MenuItem>
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

			<Box sx={{ width: '100%', display: 'flex' }}>
				<AutoTable
					data={
						search.trim().length === 0
							? data
							: filteredData.length > 0
								? filteredData
								: []
					}
					fields={COURSE_HEAD}
					url={DASHBOARD_URL.courseUpdate}
					deleteUrl={APP_API.course}
					getAll={getAll}
					pathName={pathName}
				/>
			</Box>
			<Pagination totalItems={totalItems} getAll={getAll} />
		</Box>
	) : (
		<Loader />
	)
}
