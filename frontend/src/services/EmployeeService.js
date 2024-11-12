import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:5000/api/employees";

class EmployeeService {

    // Get all employees
    getAllEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    // Create a new employee
    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    // Get employee by ID
    getEmployeeById(employeeId) {
        return axios.get(`${EMPLOYEE_API_BASE_URL}/${employeeId}`);
    }

    // Update employee by ID
    updateEmployee(employeeId, employee) { 
        return axios.put(`${EMPLOYEE_API_BASE_URL}/${employeeId}`, employee);
    }

    // Delete employee by ID
    deleteEmployee(employeeId) {
        return axios.delete(`${EMPLOYEE_API_BASE_URL}/${employeeId}`);
    }
}

export default new EmployeeService();
