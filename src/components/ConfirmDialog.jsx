import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { NotListedLocation } from '@material-ui/icons';
import React from 'react';
import Controls from './controls/Controls';

const useStyles = makeStyles(theme => ({
	dialog: {
		padding: theme.spacing(5),
		position: 'absolute',
		padding: theme.spacing(2),
	},
	DialogContent: {
		textAlign: 'center',
	},
	DialogAction: {
		justifyContent: 'center',
	},
	DialogTitle: {
		textAlign: 'center',
	},
	titleIcon: {
		backgroundColor: theme.palette.secondary.light,
		color: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.light,
			cursor: 'default',
		},
		'& .MuiSvgIcon-root': {
			fontSize: '8rem',
		},
	},
}));

function ConfirmDialog(props) {
	const { confirmDialog, setConfirmDialog } = props;

	const classes = useStyles();
	return (
		<Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
			<DialogTitle className={classes.DialogTitle}>
				<IconButton className={classes.titleIcon}>
					<NotListedLocation />
				</IconButton>
			</DialogTitle>
			<DialogContent className={classes.DialogContent}>
				<Typography variant='h6'>{confirmDialog.title}</Typography>
				<Typography variant='subtitle2'>
					{confirmDialog.subTitle}
				</Typography>
			</DialogContent>
			<DialogActions className={classes.DialogAction}>
				<Controls.Button
					text='No'
					color='default'
					onClick={() =>
						setConfirmDialog({ ...confirmDialog, isOpen: false })
					}
				/>
				<Controls.Button
					text='Yes'
					color='secondary'
					onClick={confirmDialog.onConfirm}
				/>
			</DialogActions>
		</Dialog>
	);
}

export default ConfirmDialog;
