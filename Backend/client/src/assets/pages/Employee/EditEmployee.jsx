import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [role, setRole] = useState('');
  const [phone, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8090/employees/${id}`)
      .then((response) => {
        const { EmpID, employeeName, role, phone, password, passwordConfirm } = response.data;
        setEmpID(EmpID);
        setemployeeName(employeeName);
        setRole(role);
        setContactNo(phone);
        setPassword(password);
        setPasswordConfirm(passwordConfirm);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.error(error);
      });
  }, [id]);

  const handleEditEmployee = () => {
    setLoading(true);
    const data = {
      EmpID,
      employeeName,
      role,
      phone,
      password,
      passwordConfirm
    };
    axios
      .put(`http://localhost:8090/employees/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/employees/allEmployee');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred. Please check the console.');
        console.error(error);
      });
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
      margin: 'auto',
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
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '18px',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      marginTop: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <BackButton destination='/employees/allEmployee' />
      <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Edit Employee</h1>
      {loading ? <Spinner /> : null}
      <div style={styles.formContainer}>
        {[
          { label: 'EmpID', value: EmpID, onChange: setEmpID },
          { label: 'Employee Name', value: employeeName, onChange: setemployeeName },
          { label: 'Role', value: role, onChange: setRole },
          { label: 'Phone', value: phone, onChange: setContactNo },
          { label: 'Password', value: password, onChange: setPassword },
          { label: 'Confirm Password', value: passwordConfirm, onChange: setPasswordConfirm }
        ].map((field, index) => (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            <label style={styles.label}>{field.label}</label>
            <input
              type={field.label.includes('Password') ? 'password' : 'text'}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              style={styles.input}
            />
          </div>
        ))}
        <button style={styles.button} onClick={handleEditEmployee}>Save</button>
      </div>
    </div>
  );
};

export default EditEmployee;
