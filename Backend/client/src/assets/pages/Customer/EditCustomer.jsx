import React, { useState, useEffect } from 'react';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditCustomer = () => {
  const [cusID, setCusID] = useState('');
  const [date, setDate] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [NIC, setNIC] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8090/customers/${id}`)
      .then((response) => {
        const { cusID, date, firstName, lastName, NIC, phone, email } = response.data;
        setCusID(cusID);
        setDate(date);
        setFirstName(firstName);
        setLastName(lastName);
        setNIC(NIC);
        setPhone(phone);
        setEmail(email);
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id]);

  const handleEditCustomer = () => {
    // Validation
    if (!firstName || !lastName || !NIC || !validatePhone(phone) || !validateEmail(email)) {
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
      email
    };
    setLoading(true);
    axios
      .put(`http://localhost:8090/customers/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate('/customers/allCustomers');
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

  // Function to validate email format
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <div className='p-4'>
      <BackButton destination='/customers/allCustomers' />
      <h1 className='text-3xl my-4'>Edit Customer</h1>
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
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Date</label>
          <input
            type='text'
            value={date}
            readOnly // Make the input field read-only
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
          {!validateEmail(email) && <p className="text-red-500">Please enter a valid email address.</p>}
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditCustomer}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditCustomer;
