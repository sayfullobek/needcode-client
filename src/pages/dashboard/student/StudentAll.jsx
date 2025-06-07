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
import { EMPLOYEE_BREADCRUMP } from '../../../utils/BreadcrumpUtils'
import { EMPLOYEE_HEAD } from '../../../utils/TableHeadUtils'
import { DASHBOARD_URL } from '../../../utils/Utils'

export const StudentAll = () => {
	const [search, setSearch] = useState('')
	const [searchField, setSearchField] = useState('firstName') // default: name
	const [data, setData] = useState([])
	const [totalItems, setTotalItems] = useState(0)
	const [forSearch, setForSearch] = useState([])
	const [loading, setLoading] = useState(false)
	const [filteredData, setFilteredData] = useState([])
	const pathName = useLocation().pathname

	const getAll = async (page = 1, limit = 10) => {
		try {
			const res = await AutoGet(
				`${APP_API.employee}/students?page=${page}&limit=${limit}`
			)
			setData(res.users)
			setTotalItems(res.totalUsers)
			const searchs = await AutoGet(
				`${APP_API.employee}/students?page=1&limit=${res.totalItems}`
			)
			setForSearch(searchs.users)
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
			case 'firstName':
				return 'Ismi bo‘yicha qidirish...'
			case 'lastName':
				return 'Familiyasi bo‘yicha qidirish...'
			case 'email':
				return 'Emaili bo‘yicha qidirish...'
			case 'role':
				return 'Roli bo‘yicha qidirish...'
			default:
				return 'Qidirish...'
		}
	}

	const exportToExcel = () => {
		const exportData = search.trim().length === 0 ? forSearch : filteredData
		const worksheet = XLSX.utils.json_to_sheet(exportData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'EmployeeData')

		const excelBuffer = XLSX.write(workbook, {
			bookType: 'xlsx',
			type: 'array',
		})
		const dataBlob = new Blob([excelBuffer], {
			type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
		})
		saveAs(dataBlob, 'employee-data.xlsx')
	}

	return loading ? (
		<Box sx={{ padding: '3rem' }}>
			<Breadcrump
				status={'none'}
				url={`/${DASHBOARD_URL.employeeAdd}`}
				arr={EMPLOYEE_BREADCRUMP}
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
						<MenuItem value='firstName'>Ismi</MenuItem>
						<MenuItem value='lastName'>Familiyasi</MenuItem>
						<MenuItem value='email'>Emaili</MenuItem>
						<MenuItem value='role'>Roli</MenuItem>
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
				fields={EMPLOYEE_HEAD}
				url={DASHBOARD_URL.employeeUpdate}
				deleteUrl={APP_API.employee}
				getAll={getAll}
				pathName={pathName}
			/>
			<Pagination totalItems={totalItems} getAll={getAll} />
		</Box>
	) : (
		<Loader />
	)
}
