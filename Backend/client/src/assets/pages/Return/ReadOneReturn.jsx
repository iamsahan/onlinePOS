import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

//check new

const ReadOneReturn = () => {
  const [returnData, setReturnData] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8090/returns/${id}`)
      .then((response) => {
        setReturnData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton destination='/returns/allReturns' /> 
      <h1 className='text-3xl my-4'>Show Return</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Return ID :</span>
            <span>{returnData.returnID}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Return Date :</span>
            <span>{returnData.returnDate}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Return Item Name :</span>
            <span>{returnData.returnItemN}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Reason :</span>
            <span>{returnData.reason}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Customer Name :</span>
            <span>{returnData.cusName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Customer Address :</span>
            <span>{returnData.cAddress}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Phone Number :</span>
            <span>{returnData.phoneNO}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Return Status :</span>
            <span>{returnData.rStatus}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadOneReturn;