import React, { useState } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//new

const CreateCustomer = () => {
  const [cusID, setCusID] = useState('');
  const [date] = useState(new Date().toISOString().split('T')[0]); // Auto-generate today's date
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Function to generate customer ID
  const generateCusID = () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // Generate 5-digit random number
    setCusID('C' + randomNumber); // Append 'C' to the random number
  };

  // Function to validate phone number format
  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const handleSaveCustomer = () => {
    // Validation
    if (!firstName || !lastName || !NIC || !validatePhone(phone)) {
      setError('Please fill in all required fields correctly.');
      return;
    }

    // Save customer
    const data = {
      cusID,
      date,
      firstName,
      lastName,
      NIC,
      phone,
      email,
    };
    setLoading(true);
    axios
      .post('http://localhost:8090/customers', data)
      .then(() => {
        setLoading(false);
        navigate('/customers/allCustomers');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton destination='/customers/allCustomers' />
      <h1 className='text-3xl my-4'>Create Customer</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        {error && <p className="text-red-500">{error}</p>}
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Customer ID</label>
          <input
            type='text'
            value={cusID}
            readOnly // Make the input field read-only
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          <button className='bg-gray-300 px-2 py-1 rounded-md ml-2' onClick={generateCusID}>
            Generate
          </button>
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Date</label>
          <input
            type='date'
            value={date}
            disabled
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>First Name</label>
          <input
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Last Name</label>
          <input
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>NIC</label>
          <input
            type='text'
            value={NIC}
            onChange={(e) => setNIC(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Phone</label>
          <input
            type='text'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          {!validatePhone(phone) && <p className="text-red-500">Phone number should be 10 digits.</p>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Email</label>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveCustomer}>
          Save
        </button>
      </div>
    </div>
  );
}

export default CreateCustomer;
