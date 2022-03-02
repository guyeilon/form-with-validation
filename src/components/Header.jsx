import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import {
	Badge,
	Grid,
	IconButton,
	InputBase,
	makeStyles,
	Toolbar,
} from '@material-ui/core';
import {
	ChatBubbleOutline,
	NotificationsOutlined,
	PowerSettingsNew,
	Search,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
	appBar: {
		// width: 'calc(100% - 320px)',
		backgroundColor: '#fff',
		position: 'static',
	},
	searchInput: {
		opacity: '0.6',
		padding: '0px 8px',
		fontSize: '0.8rem',
		'&:hover': {
			backgroundColor: '#f2f2f2',
		},
		'& .MuiSvgIcon-root': {
			marginRight: theme.spacing(1),
		},
	},
}));

function Header() {
	const classes = useStyles();

	return (
		<AppBar className={classes.appBar}>
			<Toolbar>
				<Grid container alignItems='center'>
					<Grid item>
						<InputBase
							placeholder='Search topics'
							startAdornment={<Search fontSize='small' />}
							className={classes.searchInput}
						/>
					</Grid>
					<Grid item xs></Grid>
					<Grid item>
						<IconButton>
							<Badge badgeContent={4} color='secondary'>
								<NotificationsOutlined fontSize='small' />
							</Badge>
						</IconButton>
						<IconButton>
							<Badge badgeContent={3} color='primary'>
								<ChatBubbleOutline fontSize='small' />
							</Badge>
						</IconButton>
						<IconButton>
							<PowerSettingsNew fontSize='small' />
						</IconButton>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBar>
	);
}

export default Header;
