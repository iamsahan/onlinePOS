import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployeeAttendence = () => {
  const [EmpID, setEmpID] = useState('');
  const [employeeName, setemployeeName] = useState('');
  const [date, setdate] = useState('');
  const [InTime, setInTime] = useState('');
  const [OutTime, setOutTime] = useState('');
  const [WorkingHours, setWorkingHours] = useState('');
  const [OThours, setOThours] = useState('');
  
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8090/EmployeeAttendence/${id}`)
    .then((response) => {
        setEmpID(response.data.EmpID);
        setemployeeName(response.data.employeeName)
        setdate(response.data.date)
        setInTime(response.data.InTime);
        setOutTime(response.data.OutTime)
        setWorkingHours(response.data.WorkingHours)
        setOThours(response.data.OThours)
        
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please Chack console');
        console.log(error);
      });
  }, [])
  
  const handleEditEmployeeAttendence = () => {
    const data = {
      EmpID,
      employeeName,
      date,
      InTime,
      OutTime,
      WorkingHours,
      OThours
    };
    setLoading(true);
    axios
      .put(`http://localhost:8090/EmployeeAttendence/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/EmployeeAttendence/allEmployeeAttendence');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleInTimeChange = (e) => {
    setInTime(e.target.value);
    calculateHoursWorked(e.target.value, OutTime);
  };

  const handleOutTimeChange = (e) => {
    setOutTime(e.target.value);
    calculateHoursWorked(InTime, e.target.value);
  };

  const calculateHoursWorked = (inTime, outTime) => {
    const inTimeParts = inTime.split(':');
    const outTimeParts = outTime.split(':');

    const inTimeDate = new Date(
      2000,
      0,
      1,
      parseInt(inTimeParts[0]),
      parseInt(inTimeParts[1]),
      0
    );
    const outTimeDate = new Date(
      2000,
      0,
      1,
      parseInt(outTimeParts[0]),
      parseInt(outTimeParts[1]),
      0
    );

    if (isNaN(inTimeDate.getTime()) || isNaN(outTimeDate.getTime())) {
      console.error('Invalid input time format');
      return;
    }

    const timeDiff = outTimeDate - inTimeDate;
    const hoursWorked = timeDiff / (1000 * 60 * 60);
    const normalWorkingHours = 8;

    if (hoursWorked > normalWorkingHours) {
      const overtimeHours = hoursWorked - normalWorkingHours;
      setOThours(overtimeHours.toFixed(2));
      setWorkingHours(normalWorkingHours.toFixed(2));
    } else {
      setOThours('0.00');
      setWorkingHours(hoursWorked.toFixed(2));
    }
  };

  const handleRecordInTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const newInTime = `${hours}:${minutes}`;
    setInTime(newInTime);
    calculateHoursWorked(newInTime, OutTime);
  };
  
  const handleRecordOutTime = () => {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const newOutTime = `${hours}:${minutes}`;
    setOutTime(newOutTime);
    calculateHoursWorked(InTime, newOutTime);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <BackButton destination='/EmployeeAttendence/allEmployeeAttendence' /> 
      <h1 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>Edit Employee Attendence</h1>
      {loading ? <Spinner /> : ''}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
        <div style={{ border: '2px solid #87CEEB', borderRadius: '8px', width: '300px', padding: '1rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>EmpID</label>
            <input
              type='text'
              value={EmpID}
              onChange={(e) => setEmpID(e.target.value)}
              style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>employeeName</label>
            <input
              type='text'
              value={employeeName}
              onChange={(e) => setemployeeName(e.target.value)}
              style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
            />
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Date</label>
            <input
              type='date'
              value={date}
              onChange={(e) => setdate(e.target.value)}
              style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
            />
          </div>
        </div>
  
        <div style={{ border: '2px solid #87CEEB', borderRadius: '8px', width: '300px', padding: '1rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>InTime</label>
            <input
              type='time'
              value={InTime}
              onChange={handleInTimeChange}
              style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
            />
            <button
              onClick={handleRecordInTime}
              style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', marginLeft: '0.5rem', cursor: 'pointer' }}
            >
              Record Current Time
            </button>
          </div>
  
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>OutTime</label>
            <input
              type='time'
              value={OutTime}
              onChange={handleOutTimeChange}
              style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
            />
            <button
              onClick={handleRecordOutTime}
              style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', marginLeft: '0.5rem', cursor: 'pointer' }}
            >
              Record Current Time
            </button>
          </div>
        </div>
  
        <div style={{ border: '2px solid #87CEEB', borderRadius: '8px', width: '300px', padding: '1rem' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Working Hours</label>
            <input
              type='text'
              value={WorkingHours}
              readOnly
              style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
            />
          </div>
  
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ fontSize: '1rem', marginRight: '0.5rem', color: '#555' }}>Overtime Hours</label>
            <input
              type='text'
              value={OThours}
              readOnly
              style={{ border: '2px solid #ccc', padding: '0.5rem', width: '100%' }}
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
        <button
          className='p-2 bg-sky-300 m-2'
          style={{ width: '150px' }}
          onClick={handleEditEmployeeAttendence}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditEmployeeAttendence;
