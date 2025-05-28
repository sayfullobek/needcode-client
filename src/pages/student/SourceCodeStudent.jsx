import {
	Box,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { Breadcrump } from '../../component/Breadcrump'
import { Loader } from '../../component/Loader'
import { Pagination } from '../../component/Pagination'
import { SourceCodeComp } from '../../component/SourceCodeComp'
import { APP_API } from '../../config/BaseConfig'
import { AutoGet } from '../../config/service/AppService'
import { STUDENT_SOURCE_CODE_BREADCRUMP } from '../../utils/BreadcrumpUtils'

export const SourceCodeStudent = () => {
	const [data, setData] = useState([])
	const [totalItems, setTotalItems] = useState(0)
	const [forSearch, setForSearch] = useState([])
	const [loading, setLoading] = useState(false)
	const [search, setSearch] = useState('')
	const [filteredData, setFilteredData] = useState([])
	const [searchField, setSearchField] = useState('name') // default: name

	const getAll = async (page = 1, limit = 10) => {
		try {
			const res = await AutoGet(
				`${APP_API.sourceCode}?page=${page}&limit=${limit}`
			)
			setData(res.data)
			setTotalItems(res.totalItems)
			const searchs = await AutoGet(
				`${APP_API.sourceCode}?page=1&limit=${res.totalItems}`
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
			default:
				return 'Qidirish...'
		}
	}
	return loading ? (
		<Grid sx={{ padding: '3rem' }}>
			<Breadcrump status={'none'} arr={STUDENT_SOURCE_CODE_BREADCRUMP} />
			<Box
				sx={{
					display: 'flex',
					margin: '3rem 0 1rem 0',
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
			</Box>
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
				{search.trim().length === 0 ? (
					data.map(item => <SourceCodeComp item={item} />)
				) : filteredData.length === 0 ? (
					<Typography gutterBottom color='error' variant='h5' component='div'>
						Qidiruv natijasida hech qanday ma'lumot topilmadi!
					</Typography>
				) : (
					filteredData.map(item => <SourceCodeComp item={item} />)
				)}
			</Box>
			<Pagination totalItems={totalItems} getAll={getAll} />
		</Grid>
	) : (
		<Loader />
	)
}
