import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
} from '@mui/material'
export const AutoForm = ({ fields = [], onSubmit, formData, setFormData }) => {
	const handleChange = e => {
		const { name, value, files, type, multiple } = e.target

		setFormData(prev => ({
			...prev,
			[name]: type === 'file' ? files[0] : multiple ? Array.from(value) : value,
		}))
	}

	const internalSubmit = e => {
		e.preventDefault()
		onSubmit(formData)
	}

	return (
		<Box
			component='form'
			onSubmit={internalSubmit}
			sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}
		>
			{fields.map(field => (
				<FormControl
					key={field.name}
					sx={{ width: `${field.col}`, minWidth: 250 }}
				>
					{field.type === 'file' ? (
						<>
							<InputLabel shrink>{field.label}</InputLabel>
							<OutlinedInput
								name={field.name}
								type='file'
								onChange={handleChange}
								inputProps={{ accept: 'image/*' }}
								notched
							/>
						</>
					) : field.type === 'video' ? (
						<>
							<InputLabel shrink>{field.label}</InputLabel>
							<OutlinedInput
								name={field.name}
								type='file'
								onChange={handleChange}
								inputProps={{ accept: 'video/*' }}
								notched
							/>
						</>
					) : field.type === 'editPhotoSee' ? (
						<img
							src={
								formData['photo']
									? URL.createObjectURL(formData['photo'])
									: formData['imageUrl'] || ''
							}
							alt=''
						/>
					) : field.type === 'select' ? (
						<>
							<InputLabel shrink>{field.label}</InputLabel>
							<Select
								name={field.name}
								value={formData[field.name] || ''}
								onChange={handleChange}
								displayEmpty
								input={<OutlinedInput notched label={field.label} />}
							>
								<MenuItem value='' disabled>
									{field.label} ni tanlang
								</MenuItem>
								{field.arr?.map(option => (
									<MenuItem
										key={option.value || option._id}
										value={option.value || option._id}
									>
										{option.firstName || option.name}
									</MenuItem>
								))}
							</Select>
						</>
					) : field.type === 'multi-select' ? (
						<>
							<InputLabel shrink>{field.label}</InputLabel>
							<Select
								multiple
								name={field.name}
								value={formData[field.name] || []}
								onChange={handleChange}
								displayEmpty
								input={<OutlinedInput notched label={field.label} />}
								renderValue={selected => {
									if (selected.length === 0) {
										return <em>{field.label} ni tanlang</em>
									}
									return selected.join(', ')
								}}
							>
								<MenuItem disabled value=''>
									{field.label} ni tanlang
								</MenuItem>
								{field.arr?.map(option => (
									<MenuItem
										key={option.value || option._id}
										value={option.value || option._id}
									>
										{option.firstName || option.name}
									</MenuItem>
								))}
							</Select>
						</>
					) : (
						<TextField
							label={field.label}
							name={field.name}
							type={field.type === 'textarea' ? 'text' : field.type}
							value={formData[field.name] || ''}
							onChange={handleChange}
							variant='outlined'
							fullWidth
							multiline={field.type === 'textarea'}
							minRows={field.type === 'textarea' ? 4 : 1}
						/>
					)}
				</FormControl>
			))}
			<Button type='submit' variant='contained' color='primary'>
				Saqlash
			</Button>
		</Box>
	)
}
