import { TextField } from '@material-ui/core';
import React from 'react';

function Input(props) {
	const { name, label, onChange, value, error = null, ...other } = props;
	return (
		<TextField
			variant='outlined'
			label={label}
			name={name}
			value={value}
			onChange={onChange}
			{...(error && { error: true, helperText: error })}
			{...other}
		/>
	);
}

export default Input;
