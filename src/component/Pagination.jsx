import TablePagination from '@mui/material/TablePagination'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const Pagination = ({ totalItems, getAll }) => {
	const pathName = useLocation().pathname

	const [page, setPage] = useState(() => {
		const stored = localStorage.getItem(`start-page-${pathName}`)
		return stored ? Number.parseInt(stored) - 1 : 0
	})

	const [rowsPerPage, setRowsPerPage] = useState(() => {
		const stored = localStorage.getItem(`limit-page-${pathName}`)
		return stored ? Number.parseInt(stored) : 10
	})

	useEffect(() => {
		localStorage.setItem(`start-page-${pathName}`, page + 1)
		localStorage.setItem(`limit-page-${pathName}`, rowsPerPage)
		getAll(page + 1, rowsPerPage)
	}, [page, rowsPerPage])

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (
		<TablePagination
			component='div'
			count={totalItems}
			page={page}
			onPageChange={handleChangePage}
			rowsPerPage={rowsPerPage}
			onRowsPerPageChange={handleChangeRowsPerPage}
			sx={{ marginTop: '1rem' }}
		/>
	)
}
