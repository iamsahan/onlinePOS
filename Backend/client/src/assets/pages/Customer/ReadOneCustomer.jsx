import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import QRCode from 'qrcode.react';

const ReadOneCustomer = () => {
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8090/customers/${id}`)
      .then((response) => {
        setCustomerData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Encode customer details into a string
  const encodeCustomerDetails = () => {
    return JSON.stringify(customerData);
  };

  return (
    <div className='p-4'>
      <BackButton destination='/customers/allCustomers' />
      <h1 className='text-3xl my-4'>Show Customer</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <QRCode value={encodeCustomerDetails()} />
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Customer ID :</span>
            <span>{customerData.cusID}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Date :</span>
            <span>{customerData.date}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>First Name :</span>
            <span>{customerData.firstName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Name :</span>
            <span>{customerData.lastName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>NIC :</span>
            <span>{customerData.NIC}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Phone :</span>
            <span>{customerData.phone}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Email :</span>
            <span>{customerData.email}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneCustomer;
