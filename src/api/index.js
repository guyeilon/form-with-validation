import axios from 'axios';

const url = 'https://form-with-valdiation-app.herokuapp.com/employees';
// const url = 'http://localhost:5000/employees';

export const fetchEmployees = () => axios.get(url);
export const createEmployee = newEmployee => axios.post(url, newEmployee);
export const updateEmployee = (id, updatedEmployee) =>
	axios.patch(`${url}/${id}`, updatedEmployee);
export const deleteEmployee = id => axios.delete(`${url}/${id}`);
