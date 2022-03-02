import React, { useEffect } from 'react';
import SideMenu from '../components/SideMenu';

import {
	createTheme,
	CssBaseline,
	makeStyles,
	ThemeProvider,
} from '@material-ui/core';
import Header from '../components/Header';

import Employees from '../pages/Employees/Employees';
import { useDispatch } from 'react-redux';
import { getEmployees } from '../actions/employees';

const theme = createTheme({
	palette: {
		primary: {
			main: '#333996',
			light: '#3c44b126',
		},
		secondary: {
			main: '#f83245',
			light: '#f8324526',
		},
		background: {
			default: '#f4f5fd',
		},
	},
	shape: {
		borderRadius: '12px',
	},
	overrides: {
		MuiAppBar: {
			root: {
				transform: 'translateZ(0)',
			},
		},
	},
	props: {
		MuiIconButton: {
			disableRipple: true,
		},
	},
});

const useStyles = makeStyles(theme => ({
	appMain: {
		paddingLeft: 0,
		[theme.breakpoints.up('sm')]: {
			paddingLeft: '100px',
		},
		width: '100%',
	},
}));

function App() {
	const classes = useStyles();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEmployees());
	}, [dispatch]);

	return (
		<ThemeProvider theme={theme}>
			<SideMenu />
			<div className={classes.appMain}>
				<Header />

				<Employees />
			</div>
			<CssBaseline />
		</ThemeProvider>
	);
}

export default App;
