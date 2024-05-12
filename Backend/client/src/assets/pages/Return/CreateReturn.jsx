import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateReturn = () => {
  const [returnID, setReturnID] = useState('');
  const [returnDate] = useState(new Date().toISOString().split('T')[0]); // Auto-generate today's date
  const [returnItemN, setReturnItemN] = useState('');
  const [reason, setReason] = useState('');
  const [cusName, setCusName] = useState('');
  const [cAddress, setCAddress] = useState('');
  const [phoneNO, setPhoneNO] = useState('');
  const [rStatus, setRStatus] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to generate return ID
  const generateReturnID = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit random number
    setReturnID('R' + randomNumber); // Append 'R' to the random number
  };

  // Function to validate phone number format
  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleSaveReturn = () => {
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
      rStatus,
    };
    setLoading(true);
    axios
      .post('http://localhost:8090/returns', data)
      .then(() => {
        setLoading(false);
        navigate('/returns/allReturns');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination='/returns/allReturns' />
      <h1 className='text-3xl my-4'>Create Return</h1>
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
          <button className='bg-gray-300 px-2 py-1 rounded-md ml-2' onClick={generateReturnID}>
            Generate
          </button>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Return Date</label>
          <input
            type='date'
            value={returnDate}
            disabled
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
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveReturn}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateReturn;
