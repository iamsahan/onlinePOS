import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

function ShowEmployee() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8070/employees');
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8070/searchEmployee?search=${searchQuery}`);
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employee:', error);
    }
    setLoading(false);
  };

  const applySearchFilter = (employee) => (
    employee.EmpID.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEmployee = employees.filter(applySearchFilter);

  const styles = {
    linkEdit: {
      display: 'inline-block',
      backgroundColor: '#f1c40f',
      color: 'white',
      padding: '5px 10px',
      margin: '0 5px',
      borderRadius: '4px',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    },
    linkDelete: {
      display: 'inline-block',
      backgroundColor: '#e74c3c',
      color: 'white',
      padding: '5px 10px',
      margin: '0 5px',
      borderRadius: '4px',
      textDecoration: 'none',
      transition: 'background-color 0.3s',
    }
  };

  return (
    <div className="d-flex">
      <div>
        <Sidebar />
      </div>
      <div className="flex-grow-1 px-3"><br/>
        <h3><u>Employee List</u></h3><br/>
        <input
          type="text"
          className="form-control mb-3"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search employees"
        /><br/>
        <button onClick={handleSearch} style={styles.button}>Search</button>
      </div>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => window.location.href = '/employees/create'}>Add Employee</button>
        <button style={styles.button} onClick={() => window.location.href = '/employees/reportEmployee'}>Report</button>
        <button style={styles.button} onClick={() => window.location.href = '/EmployeeAttendence/allEmployeeAttendence'}>Attendance</button>
      </div>

      {loading ? <Spinner /> : (
        <table className="table table-striped">
          <thead>
            <tr className="table-warning">
              <th>No</th>
              <th>EmpID</th>
              <th>Employee Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployee.map((employee, index) => (
              <tr key={employee._id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{employee.EmpID}</td>
                <td style={styles.td}>{employee.employeeName}</td>
                <td style={styles.td}>{employee.role}</td>
                <td style={styles.td}>{employee.phone}</td>
                <td style={styles.td}>
                  <Link to={`/employees/details/${employee._id}`} style={styles.linkShow}>Show</Link>
                  <Link to={`/employees/edit/${employee._id}`} style={styles.linkEdit}>Edit</Link>
                  <Link to={`/employees/delete/${employee._id}`} style={styles.linkDelete}>Delete</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ShowEmployee;
