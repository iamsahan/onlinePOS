import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Sidebar from '../../components/salesManagement/Sidebar';

const SupplierUpdatePage = () => {
  const { id } = useParams(); // Use useParams hook to access route parameters
  const [formData, setFormData] = useState({
    
    status: '',
    
  });

  const navigate = useNavigate();


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
      await axios.put(`http://localhost:8070/api/pos/updte/${id}`, formData);
      // Optionally, you can redirect the user to another page after successful update
      swal("Good job!", "Sales Updated Successfully!", "success");
      navigate('/sales');
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  return (
    <div className="dashboard">
        <Sidebar/>

        <div className="dashboard-content">
        <div className="itm-conte">
      <h2>Update Suales</h2>
      <form onSubmit={handleSubmit}>
     
        <input type="text" name="status" value={formData.status} onChange={handleChange} placeholder={formData.status} required /><br/>
        <button className="btn" type="submit">Update Sales</button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default SupplierUpdatePage;
