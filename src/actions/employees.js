import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';

// Action Creators
export const getEmployees = () => async dispatch => {
	try {
		const { data } = await api.fetchEmployees();

		dispatch({ type: FETCH_ALL, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const createEmployee = employee => async dispatch => {
	try {
		const { data } = await api.createEmployee(employee);
		dispatch({ type: CREATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const updateEmployee = (id, employee) => async dispatch => {
	try {
		const { data } = await api.updateEmployee(id, employee);

		dispatch({ type: UPDATE, payload: data });
	} catch (error) {
		console.log(error.message);
	}
};

export const deleteEmployee = id => async dispatch => {
	try {
		await api.deleteEmployee(id);
		dispatch({ type: DELETE, payload: id });
	} catch (error) {
		console.log(error.message);
	}
};
