import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteEmployeeAttendence = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteEmployeeAttendence = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8090/EmployeeAttendence/${id}`)
      .then(() => {
        setLoading(false);
        navigate('/EmployeeAttendence/allEmployeeAttendence');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  
  return (
    <div style={{ padding: '1rem' }}>
      <BackButton destination='/EmployeeAttendence/allEmployeeAttendence' /> 
      <h1 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Delete Employee Attendance</h1>
      {loading ? <Spinner /> : ''}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #87CEEB', borderRadius: '8px', width: '600px', padding: '2rem', margin: '0 auto' }}>
        <h3 style={{ fontSize: '1.25rem', margin: '1rem 0' }}>Are You Sure You want to delete this Employee Attendance?</h3>

        <button
          style={{ padding: '1rem', backgroundColor: '#FF6347', color: '#fff', margin: '1rem auto', width: '100%', borderRadius: '8px', cursor: 'pointer', border: 'none' }}
          onClick={handleDeleteEmployeeAttendence}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}

export default DeleteEmployeeAttendence;
