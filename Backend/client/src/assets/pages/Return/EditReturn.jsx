import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditReturn = () => {
  const [returnID, setReturnID] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [returnItemN, setReturnItemN] = useState('');
  const [reason, setReason] = useState('');
  const [cusName, setCusName] = useState('');
  const [cAddress, setCAddress] = useState('');
  const [phoneNO, setPhoneNO] = useState('');
  const [rStatus, setRStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8090/returns/${id}`)
      .then((response) => {
        const { returnID, returnDate, returnItemN, reason, cusName, cAddress, phoneNO, rStatus } = response.data;
        setReturnID(returnID);
        setReturnDate(returnDate);
        setReturnItemN(returnItemN);
        setReason(reason);
        setCusName(cusName);
        setCAddress(cAddress);
        setPhoneNO(phoneNO);
        setRStatus(rStatus);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  const handleEditReturn = () => {
    // Validation
    if (!returnItemN || !reason || !cusName || !cAddress || !validatePhone(phoneNO)) {
      setError('Please fill in all required fields correctly.');
      return;
    }

    // Save return
    const data = {
      returnID,
      returnDate,
      returnItemN,
      reason,
      cusName,
      cAddress,
      phoneNO,
      rStatus
    };
    setLoading(true);
    axios
      .put(`http://localhost:8090/returns/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/returns/allReturns');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  // Function to validate phone number format
  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  return (
    <div className='p-4'>
      <BackButton destination='/returns/allReturns' />
      <h1 className='text-3xl my-4'>Edit Return</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        {error && <p className="text-red-500">{error}</p>}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Return ID</label>
          <input
            type='text'
            value={returnID}
            readOnly // Make the input field read-only
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Return Date</label>
          <input
            type='text'
            value={returnDate}
            readOnly // Make the input field read-only
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Return Item Name</label>
          <input
            type='text'
            value={returnItemN}
            onChange={(e) => setReturnItemN(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Reason</label>
          <input
            type='text'
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Customer Name</label>
          <input
            type='text'
            value={cusName}
            onChange={(e) => setCusName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Customer Address</label>
          <input
            type='text'
            value={cAddress}
            onChange={(e) => setCAddress(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Phone Number</label>
          <input
            type='text'
            value={phoneNO}
            onChange={(e) => setPhoneNO(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          {!validatePhone(phoneNO) && <p className="text-red-500">Phone number should be 10 digits.</p>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Return Status</label>
          <input
            type='text'
            value={rStatus}
            onChange={(e) => setRStatus(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditReturn}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditReturn;
