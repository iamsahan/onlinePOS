import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../Sidebar';

const CreateEmployee = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSaveEmployee = () => {
    const data = {
      EmpID,
      employeeName,
      role,
      phone,
      password,
      passwordConfirm
    };
    setLoading(true);
    axios
      .post('http://localhost:8090/employees', data)
      .then(() => {
        setLoading(false);
        navigate('/employees/allEmployee');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setPassword('');
    setPasswordConfirm('');
  };

  const styles = {
    container: {
      padding: '2rem',
      textAlign: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#fff',
      backgroundColor: '#1a1a1a'
    },
    formContainer: {
      border: '1px solid #333',
      borderRadius: '10px',
      maxWidth: '600px',
      margin: '0 auto',
      padding: '2rem',
      backgroundColor: '#333',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
    },
    input: {
      border: '1px solid #555',
      padding: '10px',
      width: '100%',
      borderRadius: '5px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#222',
      outline: 'none'
    },
    label: {
      fontSize: '1.2rem',
      marginRight: '1rem',
      color: '#ccc'
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#4CAF50',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      transition: 'background-color 0.3s ease',
      marginTop: '20px'
    }
  };

  return (
    <div>
     
      <div style={styles.container}>
        <BackButton destination='/employees/allEmployee' />
        <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Create Employee</h1>
        {loading ? <Spinner /> : null}
        <div style={styles.formContainer}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={styles.label}>EmpID</label>
            <input
              type='text'
              value={EmpID}
              onChange={(e) => setEmpID(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={styles.label}>Employee Name</label>
            <input
              type='text'
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={styles.label}>Employee Contact Number</label>
            <input
              type='text'
              value={phone}
              onChange={(e) => setContactNo(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={styles.label}>Select the Role</label>
            <select
              value={role}
              onChange={handleRoleChange}
              style={styles.input}
            >
              <option value=''>--Select a Role--</option>
              <option value='Manager'>Manager</option>
              <option value='Cashier'>Cashier</option>
              <option value='Biller'>Biller</option>
              <option value='Admin'>Admin</option>
            </select>
          </div>
          {(role !== 'Biller') && (
            <>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={styles.label}>Password</label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={styles.label}>Confirm Password</label>
                <input
                  type='password'
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  style={styles.input}
                />
              </div>
            </>
          )}
          <button style={styles.button} onClick={handleSaveEmployee}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateEmployee;
