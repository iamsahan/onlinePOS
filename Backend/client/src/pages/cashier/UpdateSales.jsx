import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Sidebar from '../../components/salesManagement/Sidebar';

const SupplierUpdatePage = () => {
  const { id } = useParams(); // Use useParams hook to access route parameters
  const [formData, setFormData] = useState({
    transactionID: '',
    timestamp: '',
    cashier: '',
    product: '',
    totalAmount: '',
    customerID: '',
    billID: '',
    paymentMethod: '',
    status: '',
    
  });

  useEffect(() => {
    const fetchSupplier = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/api/pos/getsale/${id}`);
            if (response.data.success) {
              console.log('Fetched supplier data:', response.data.data); // Log fetched data
              setFormData(response.data.data); // Update formData state
            } else {
              console.error('Supplier not found:', response.data.message);
            }
          } catch (error) {
            console.error('Error fetching supplier:', error);
          }
        
    };

    fetchSupplier();
  }, [id]); // Include id in the dependency array

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8070/api/pos/updte/${id}`, formData);
      // Optionally, you can redirect the user to another page after successful update
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  return (
    <div className="dashboard">
        <Sidebar/>

        <div className="dashboard-content">
        <div className="itm-conte">
      <h2>Update Supplier</h2>
      <form onSubmit={handleSubmit}>
      <label>Name:</label><br/>
        <input type="text" name="name" value={ formData.transactionID} onChange={handleChange} placeholder={formData.transactionID} required /><br/>
        <label>Email:</label><br/> 
        <input type="text" name="email" value={formData.timestamp} onChange={handleChange} placeholder={formData.timestamp} required /><br/>
        <label>Phone:</label><br/>
        <input type="text" name="phone" value={formData.cashier} onChange={handleChange} placeholder={formData.cashier} required /><br/>
        <label>Status:</label><br/>
        <input type="text" name="status" value={formData.product} onChange={handleChange} placeholder={formData.product} required /><br/>
        <label>Product:</label><br/>
        <input type="text" name="product" value={formData.totalAmount} onChange={handleChange} placeholder={formData.totalAmount} required /><br/>
        <label>Product:</label><br/>
        <input type="text" name="product" value={formData.customerID} onChange={handleChange} placeholder={formData.customerID} required /><br/>
        <label>Product:</label><br/>
        <input type="text" name="product" value={formData.billID} onChange={handleChange} placeholder={formData.billID} required /><br/>
        <label>Product:</label><br/>
        <input type="text" name="product" value={formData.paymentMethod} onChange={handleChange} placeholder={formData.paymentMethod} required /><br/>
        <label>Product:</label><br/>
        <input type="text" name="product" value={formData.status} onChange={handleChange} placeholder={formData.status} required /><br/>
        <button className="btn" type="submit">Update Supplier</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default SupplierUpdatePage;
