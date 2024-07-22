import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { getStorage } from 'firebase/storage';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { ref, uploadBytes } from "firebase/storage";

import AdminSidebar from "../../components/salesManagement/Sidebar";
import '../../styles/supplier/addsupp.css';

import swal from 'sweetalert';

// import { useUploadPopup } from '../../hooks/useUploadPopup';



const AddSupplier = () => {

    const firebaseConfig = {
        apiKey: "AIzaSyBF6DL7yd76wFI8Dtsm_urN_tO5aTosIck",
        authDomain: "inventory-89cb6.firebaseapp.com",
        projectId: "inventory-89cb6",
        storageBucket: "inventory-89cb6.appspot.com",
        messagingSenderId: "503372387327",
        appId: "1:503372387327:web:6dd2c069a28a10c54bcdca",
        measurementId: "G-4EBK1WK4GV"
      };
    
      const navigate = useNavigate();

      const app = initializeApp(firebaseConfig);
      const analytics = getAnalytics(app);
    
    
    const storage = getStorage(app);
    
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photo: '',
    phone: '',
    status: 'active',
    product: ''
  });


  const { name, email, photo, phone, status, product } = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePhotoUpload = async e => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, file.name);
    await uploadBytes(storageRef, file);
    const photoURL = await getDownloadURL(storageRef);
    setFormData({ ...formData, photo: photoURL });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}api/sup/addsupplier`, formData);
      console.log(res.data);
      swal("Good job!", "Supplier Added Successfully!", "success");
      navigate('/suplist');
    } catch (err) {
      console.error('Error adding supplier:', err.response.data);
    }
  };

  return (
    <div className="dashboard">
      <AdminSidebar/>
      <div className="dashboard-content">
        <div className="itm-conte">
          <h2 className='btext'>Add New Supplier</h2>
          <div className="form-back">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label><br/>
                <input 
                    type="text" 
                    className="form-control" 
                    name="name" 
                    value={name} 
                    onChange={handleChange} 
                    pattern="[A-Za-z\s]+" 
                    title="Please enter a valid name (letters and spaces only)" 
                    required 
                    />
              </div>
              <div className="form-group">
                <label>Email:</label><br/>
                <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    value={email} 
                    onChange={handleChange} 
                    required 
                    />
              </div>
              <div className="form-group">
                <label>Phone:</label><br/>
                <input 
                    type="tel" 
                    className="form-control" 
                    name="phone" 
                    value={phone} 
                    onChange={handleChange} 
                    pattern="[0-9]{10}" 
                    title="Please enter a valid 10-digit phone number" 
                    required 
                    />
              </div>
              <div className="form-group">
                <label>Product:</label><br/>
                <input type="text" className="form-control" name="product" value={product} onChange={handleChange} required />
              </div>
              <div className="form-group">
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSupplier;
