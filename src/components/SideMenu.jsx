import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
	SideMenu: {
		flexDirection: 'column',
		position: 'fixed',
		left: '0px',
		width: '100px',
		height: '100%',
		backgroundColor: '#253053',
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
	},
}));

function SideMenu() {
	const classes = useStyles();
	return <div className={classes.SideMenu}></div>;
}

export default SideMenu;
