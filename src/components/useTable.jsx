import {
	Table,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
	table: {
		marginTop: theme.spacing(3),
		'& thead th': {
			fontWeight: '600',
			color: theme.palette.primary.main,

			backgroundColor: theme.palette.primary.light,
			[theme.breakpoints.down('md')]: {
				backgroundColor: 'white',
			},
		},
		'& tbody td': {
			fontWeight: '300',
			[theme.breakpoints.up('sm')]: {
				padding: theme.spacing(1),
			},
		},

		'& tbody tr:hover': {
			backgroundColor: '#fffbf2',
			cursor: 'pointer',
		},
	},
	stickyName: {
		[theme.breakpoints.down('md')]: {
			position: 'sticky',
			backgroundColor: 'white',
			zIndex: theme.zIndex.appBar + 2,
			left: 0,
		},
	},
	stickyActions: {
		[theme.breakpoints.down('md')]: {
			position: 'sticky',
			backgroundColor: 'white',
			zIndex: theme.zIndex.appBar + 2,
			right: 0,
		},
	},
}));

function useTable(records, headCells, filterFn) {
	const classes = useStyles();

	const pages = [5, 10, 25];
	const [page, setPages] = useState(0);
	const [rowsPerPage, setRowPerPage] = useState(pages[page]);
	const [order, setOrder] = useState();
	const [orderBy, setOrderBy] = useState();

	const TblContainer = props => (
		<Table stickyHeader size='small' className={classes.table}>
			{props.children}
		</Table>
	);

	const TblHead = props => {
		const handleSortRequest = cellId => {
			const isAsc = orderBy === cellId && order === 'asc';
			setOrder(isAsc ? 'desc' : 'asc');
			setOrderBy(cellId);
		};

		return (
			<TableHead>
				<TableRow>
					{headCells.map(headCell => (
						<TableCell
							className={
								headCell.id === 'fullName'
									? classes.stickyName
									: headCell.id === 'actions'
									? classes.stickyActions
									: null
							}
							key={headCell.id}
							sortDirection={
								orderBy === headCell.id ? order : false
							}
						>
							{headCell.disableSorting ? (
								headCell.label
							) : (
								<TableSortLabel
									active={orderBy === headCell.id}
									direction={
										orderBy === headCell.id ? order : 'asc'
									}
									onClick={() =>
										handleSortRequest(headCell.id)
									}
								>
									{headCell.label}
								</TableSortLabel>
							)}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	};

	const handleChangePage = (event, newPage) => {
		setPages(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setRowPerPage(parseInt(event.target.value, 10));
		setPages(0);
	};

	function stableSort(array, comparator) {
		if (array == null) return;
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) return order;
			return a[1] - b[1];
		});
		return stabilizedThis.map(el => el[0]);
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	const recordsAfterPagingAndSorting = () => {
		return stableSort(
			filterFn.fn(records),
			getComparator(order, orderBy)
		).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
	};

	const TblPaginationXl = props => {
		const { className } = props;

		return (
			<TablePagination
				component='div'
				page={page}
				rowsPerPageOptions={pages}
				rowsPerPage={rowsPerPage}
				count={records.length}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={className}
			/>
		);
	};
	const TblPaginationSm = props => {
		const { className } = props;
		return (
			<TablePagination
				component='div'
				page={page}
				rowsPerPageOptions={[]}
				rowsPerPage={rowsPerPage}
				count={records.length}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				className={className}
			/>
		);
	};

	const setPagesAfterAdd = () => {
		setPages(Math.floor(records.length / rowsPerPage));
	};

	const setPagesAfterDelete = () => {
		if (
			records.length % rowsPerPage == 1 &&
			page != Math.floor(records.length / rowsPerPage)
		) {
			setPages(page);
		} else if (Number.isInteger((records.length - 1) / rowsPerPage))
			setPages(page - 1);
	};

	return {
		TblContainer,
		TblHead,
		TblPaginationXl,
		TblPaginationSm,
		recordsAfterPagingAndSorting,
		setPagesAfterDelete,
		setPagesAfterAdd,
		setPages,
	};
}

export default useTable;
