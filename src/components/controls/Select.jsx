import {
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select as MuiSelect,
} from '@material-ui/core';
import React from 'react';

function Select(props) {
	const { name, label, value, error = null, onChange, options } = props;
	return (
		<FormControl variant='outlined' {...(error && { error: true })}>
			<InputLabel>{label}</InputLabel>
			<MuiSelect
				name={name}
				label={label}
				value={value}
				onChange={onChange}
			>
				<MenuItem value=''>None</MenuItem>
				{options.map(item => (
					<MenuItem key={item.id} value={item.title}>
						{item.title}
					</MenuItem>
				))}
			</MuiSelect>
			{error && <FormHelperText>{error}</FormHelperText>}
		</FormControl>
	);
}

export default Select;
