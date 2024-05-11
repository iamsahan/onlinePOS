import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import Sidebar from '../../components/salesManagement/Sidebar';

const SupplierUpdatePage = () => {
  const { id } = useParams(); // Use useParams hook to access route parameters
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    status: '',
    product: ''
  });

  useEffect(() => {
    const fetchSupplier = async () => {
        try {
            const response = await axios.get(`http://localhost:8070/api/sup/getsup/${id}`);
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
      await axios.put(`http://localhost:8070/api/sup/updt/${id}`, formData);
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
        <input type="text" name="name" value={ formData.name} onChange={handleChange} placeholder={formData.name} required /><br/>
        <label>Email:</label><br/> 
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder={formData.email} required /><br/>
        <label>Phone:</label><br/>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder={formData.phone} required /><br/>
        <label>Status:</label><br/>
        <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder={formData.status} required /><br/>
        <label>Product:</label><br/>
        <input type="text" name="product" value={formData.product} onChange={handleChange} placeholder={formData.product} required /><br/>
        <button className="btn" type="submit">Update Supplier</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default SupplierUpdatePage;
