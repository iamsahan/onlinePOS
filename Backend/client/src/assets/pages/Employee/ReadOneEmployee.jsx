import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const ReadOneEmployee = () => {
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8090/employees/${id}`)
      .then((response) => {
        setEmployee(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div style={{ padding: '16px', margin: '0 auto' }}>
      <BackButton destination='/employees/allEmployee' />
      <h1 className='text-3xl font-semibold my-4'>Employee Details</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='bg-white shadow-md rounded-lg p-6'>
          <form style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', marginRight: '8px' }}>EmpID:</span>
              <span>{employee.EmpID}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', marginRight: '8px' }}>Employee Name:</span>
              <span>{employee.employeeName}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', marginRight: '8px' }}>Role:</span>
              <span>{employee.role}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', marginRight: '8px' }}>Phone:</span>
              <span>{employee.phone}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ fontWeight: '600', marginRight: '8px' }}>Password:</span>
              <span>{employee.password}</span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReadOneEmployee;
