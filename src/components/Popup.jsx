import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogTitle,
	makeStyles,
	Typography,
} from '@material-ui/core';

import Controls from './controls/Controls';
import { CloseOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	dialogWrapper: {
		padding: theme.spacing(2),
		position: 'absolute',
		top: theme.spacing(5),
		[theme.breakpoints.down('xs')]: {
			padding: theme.spacing(0.5),
			top: theme.spacing(3),
		},
	},
	DialogTitle: {
		paddingRight: 0,
	},
}));

function Popup(props) {
	const classes = useStyles();
	const { title, children, openPopup, setOpenPopup } = props;

	return (
		<Dialog
			open={openPopup}
			maxWidth='md'
			classes={{ paper: classes.dialogWrapper }}
		>
			<DialogTitle className={classes.DialogTitle}>
				<div style={{ display: 'flex' }}>
					<Typography
						variant='h6'
						component='div'
						style={{ flexGrow: 1 }}
					>
						{title}
					</Typography>
					<Controls.ActionButton
						color='secondary'
						onClick={() => {
							setOpenPopup(false);
						}}
					>
						<CloseOutlined />
					</Controls.ActionButton>
				</div>
			</DialogTitle>
			<DialogContent dividers>{children}</DialogContent>
		</Dialog>
	);
}

export default Popup;
