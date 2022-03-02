import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';

export default (employees = [], action) => {
	switch (action.type) {
		case DELETE:
			return employees.filter(
				employee => employee._id !== action.payload
			);
		case UPDATE:
			return employees.map(employee =>
				employee._id === action.payload._id ? action.payload : employee
			);
		case FETCH_ALL:
			return action.payload;

		case CREATE:
			return [...employees, action.payload];
		default:
			return employees;
	}
};
