import { Grid } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Controls from '../../components/controls/Controls';
import { useForm, Form } from '../../components/useForm';

import * as employeeService from '../../services/employeeService';

const genderItems = [
	{ id: 'male', title: 'Male' },
	{ id: 'female', title: 'Female' },
	{ id: 'other', title: 'Other' },
];

const initialFValues = {
	// id: 0,
	fullName: '',
	email: '',
	city: '',
	mobile: '',
	gender: 'male',
	departmentId: '',
	hireDate: new Date(),
	isPermanent: false,
};

function EmployeesForm(props) {
	const {
		addOrEdit,
		recordForEdit,
		setPagesAfterAdd,
		currentId,
		setCurrentId,
	} = props;

	const employee = useSelector(state =>
		currentId
			? state.employees.find(worker => worker._id === currentId)
			: null
	);

	const validate = (fieldValues = values) => {
		let temp = { ...errors };
		if ('fullName' in fieldValues)
			temp.fullName = fieldValues.fullName
				? ''
				: 'This field is required.';
		if ('email' in fieldValues)
			temp.email = /$^|.+@.+..+/.test(fieldValues.email)
				? ''
				: 'Email is not valid.';
		if ('mobile' in fieldValues)
			temp.mobile = isNaN(fieldValues.mobile)
				? 'Mobile not valid. Use numbers only.'
				: fieldValues.mobile.length > 9
				? ''
				: 'Minimum 10 numbers require';
		if ('departmentId' in fieldValues)
			temp.departmentId =
				fieldValues.departmentId.length !== 0
					? ''
					: 'This field is required.';
		setErrors({
			...temp,
		});
		if (fieldValues === values);
		return Object.values(temp).every(x => x === '');
	};

	const {
		values,
		setValues,
		errors,
		setErrors,
		handleInputChange,
		resetForm,
	} = useForm(initialFValues, true, validate);

	const handleSubmit = e => {
		e.preventDefault();
		if (validate()) {
			addOrEdit(values, resetForm);
		}
		setPagesAfterAdd();
	};

	useEffect(() => {
		if (recordForEdit != null)
			setValues({
				...recordForEdit,
			});
	}, [recordForEdit]);

	return (
		<Form onSubmit={handleSubmit}>
			<Grid container>
				<Grid item xs={12} sm={6}>
					<Controls.Input
						name='fullName'
						label='Full Name'
						value={values.fullName}
						onChange={handleInputChange}
						error={errors.fullName}
					/>
					<Controls.Input
						label='Email'
						name='email'
						value={values.email}
						onChange={handleInputChange}
						error={errors.email}
					/>
					<Controls.Input
						label='Mobile'
						name='mobile'
						value={values.mobile}
						onChange={handleInputChange}
						error={errors.mobile}
					/>
					<Controls.Input
						label='City'
						name='city'
						value={values.city}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Controls.RadioGroup
						name='gender'
						items={genderItems}
						value={values.gender}
						onChange={handleInputChange}
					/>
					<Controls.Select
						name='departmentId'
						label='Department'
						value={values.departmentId}
						onChange={handleInputChange}
						options={employeeService.getDepartmentCollection()}
						error={errors.departmentId}
					/>
					<Controls.DatePicker
						name='hireDate'
						label='Hire Date'
						value={values.hireDate}
						onChange={handleInputChange}
					/>
					<Controls.Checkbox
						name='isPermanent'
						label='Permanent Employee'
						value={values.isPermanent}
						onChange={handleInputChange}
					/>

					<div>
						<Controls.Button text='Submit' type='submit' />
						<Controls.Button
							text='Reset'
							color='default'
							onClick={resetForm}
						/>
					</div>
				</Grid>
			</Grid>
		</Form>
	);
}

export default EmployeesForm;
