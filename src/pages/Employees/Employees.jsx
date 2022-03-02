import React, { useEffect, useState } from 'react';
import PageHeader from '../../components/PageHeader';
import EmployeesForm from './EmployeesForm';
import Controls from '../../components/controls/Controls';

import {
	Add,
	DeleteOutlined,
	EditOutlined,
	PeopleOutlineTwoTone,
	Search,
} from '@material-ui/icons';
import {
	InputAdornment,
	makeStyles,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Toolbar,
} from '@material-ui/core';

import Notification from '../../components/Notification';
import Popup from '../../components/Popup';
import useTable from '../../components/useTable';

import * as employeeService from '../../services/employeeService';
import ConfirmDialog from '../../components/ConfirmDialog';

import {
	getEmployees,
	updateEmployee,
	createEmployee,
	deleteEmployee,
} from '../../actions/employees';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	pageContent: {
		margin: theme.spacing(5),
		padding: theme.spacing(3),
		[theme.breakpoints.down('xs')]: {
			margin: theme.spacing(0.5),
		},
	},
	searchInput: {
		maxWidth: '500px',
	},
	newButton: {
		position: 'absolute',
		right: '10px',
		[theme.breakpoints.down('xs')]: {
			position: 'inherit',
			marginBottom: theme.spacing(2),
		},
	},
	sticky: {
		position: 'sticky',
		left: '0',
		background: 'white',
	},
	hiddenXl: {
		'& .MuiToolbar-root': {
			[theme.breakpoints.down('xs')]: {
				display: 'none',
			},
		},
	},
	hiddenSm: {
		'& .MuiToolbar-root': {
			display: 'none',
			[theme.breakpoints.down('xs')]: {
				display: 'flex',
			},
		},
	},
	hidden: {
		[theme.breakpoints.down('xs')]: {
			display: 'none',
		},
	},
	toolbar: {
		display: 'flex',

		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column-reverse',
			alignItems: 'center',
			justifyContent: 'center',
		},
	},
}));

const headCells = [
	{ id: 'fullName', label: 'Employee Name' },
	{ id: 'email', label: 'Email Address' },
	{ id: 'mobile', label: 'Mobile Number' },
	{ id: 'department', label: 'Department' },
	{ id: 'actions', label: 'Actions', disableSorting: true },
];

function Employees() {
	const classes = useStyles();
	const dispatch = useDispatch();

	const records = useSelector(state => state.employees);

	const [recordForEdit, SetRecordForEdit] = useState(null);

	const [filterFn, setFilterFn] = useState({
		fn: items => {
			return items;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);
	const [notify, setNotify] = useState({
		isOpen: false,
		massage: '',
		type: '',
	});
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: '',
		subTitle: '',
	});

	const [currentId, setCurrentId] = useState(0);

	const {
		setPages,
		setPagesAfterAdd,
		setPagesAfterDelete,
		TblContainer,
		TblHead,
		TblPaginationXl,
		TblPaginationSm,
		recordsAfterPagingAndSorting,
	} = useTable(records, headCells, filterFn);

	const handleSearch = e => {
		setPages(0);
		let target = e.target;
		setFilterFn({
			fn: items => {
				if (target.value == '') return items;
				else
					return items.filter(x =>
						x.fullName
							.toLowerCase()
							.includes(target.value.toLowerCase())
					);
			},
		});
	};

	const addOrEdit = (employee, resetForm) => {
		if (currentId === 0) {
			dispatch(createEmployee(employee));
		} else {
			dispatch(updateEmployee(currentId, employee));
		}
		resetForm();
		SetRecordForEdit(null);
		setOpenPopup(false);
		setCurrentId(0);
		setNotify({
			isOpen: true,
			massage: 'Submitted Successfully',
			type: 'success',
		});
	};

	const openInPopup = item => {
		SetRecordForEdit(item);
		setOpenPopup(true);
	};

	const onDelete = id => {
		setConfirmDialog({
			...ConfirmDialog,
			isOpen: false,
		});
		dispatch(deleteEmployee(id));
		setNotify({
			isOpen: true,
			massage: 'Deleted Successfully',
			type: 'error',
		});
	};

	return (
		<>
			<PageHeader
				title='New Employee'
				subTitle='Form design with validation'
				icon={<PeopleOutlineTwoTone fontSize='large' />}
			/>
			<Paper className={classes.pageContent}>
				<Toolbar className={classes.toolbar}>
					<div className={classes.searchInput}>
						<Controls.Input
							label='Search Employee'
							InputProps={{
								startAdornment: (
									<InputAdornment position='start'>
										<Search />
									</InputAdornment>
								),
							}}
							onChange={handleSearch}
						/>
					</div>
					<div className={classes.newButton}>
						<Controls.Button
							text='Add New'
							variant='outlined'
							startIcon={<Add />}
							onClick={() => {
								setOpenPopup(true);
								SetRecordForEdit(null);
							}}
						/>
					</div>
				</Toolbar>
				<Paper>
					<TableContainer>
						<TblContainer>
							<TblHead />
							<TableBody>
								{records.length
									? recordsAfterPagingAndSorting().map(
											item => (
												<TableRow key={item._id}>
													<TableCell
														style={{
															position: 'sticky',
															left: 0,
															background: 'white',
														}}
													>
														{item.fullName}
													</TableCell>
													<TableCell>
														{item.email}
													</TableCell>
													<TableCell>
														{item.mobile}
													</TableCell>
													<TableCell>
														{item.departmentId}
													</TableCell>
													<TableCell
														style={{
															position: 'sticky',
															right: 0,
															background: 'white',
															overflow: 'hidden',
															whiteSpace:
																' nowrap',
														}}
													>
														<Controls.ActionButton color='primary'>
															<EditOutlined
																fontSize='small'
																onClick={() => {
																	openInPopup(
																		item
																	);
																	setCurrentId(
																		item._id
																	);
																}}
															/>
														</Controls.ActionButton>
														<Controls.ActionButton
															color='secondary'
															onClick={() => {
																setConfirmDialog(
																	{
																		isOpen: true,
																		title: 'Are you sure to delete this record? ',
																		subTitle:
																			"You can't undo this operation ",
																		onConfirm:
																			() => {
																				onDelete(
																					item._id
																				);
																				setPagesAfterDelete();
																			},
																	}
																);
															}}
														>
															<DeleteOutlined fontSize='small' />
														</Controls.ActionButton>
													</TableCell>
												</TableRow>
											)
									  )
									: null}
							</TableBody>
						</TblContainer>
					</TableContainer>
				</Paper>
				<TblPaginationXl className={classes.hiddenXl} />
				<TblPaginationSm className={classes.hiddenSm} />
			</Paper>
			<Popup
				title='Employees Form'
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<EmployeesForm
					currentId={currentId}
					setCurrentId={setCurrentId}
					addOrEdit={addOrEdit}
					recordForEdit={recordForEdit}
					setPagesAfterAdd={setPagesAfterAdd}
				/>
			</Popup>
			<Notification notify={notify} setNotify={setNotify} />
			<ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</>
	);
}

export default Employees;
