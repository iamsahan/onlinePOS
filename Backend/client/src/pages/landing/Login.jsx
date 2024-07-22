import React, { useState } from 'react';
import Lottie from 'lottie-react';
import { useNavigate } from 'react-router-dom';

import Animation from '../../assets/Animation - 1721412613158.json';
import axios from 'axios';

const Login = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email : '',
    password : ''
  })

  const { email, password } = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name] : e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:8070/api/auth/login', formData);
      const { token } = res.data;

      localStorage.setItem('token', token);
      navigate('/cashier');
    } catch (err) {
      console.error('Error adding supplier:', err);
    }
  }
  return (
    <div style={{color:'white', alignItems:'center', marginLeft:'auto', marginRight:'auto', display:'flex', flexDirection:'column', marginTop:'100px'}}>
        <Lottie animationData={Animation} style={{height: '650px', position: 'absolute',  textAlign:'center', zIndex:'-1', opacity:'90%'}}/>
       
            <h2 style={{textAlign:'center', marginTop:'50px', marginBottom:'80px', fontSize:'40px'}}>Sign Into Your Account</h2>
            <form onSubmit={handleSubmit}> 
            <div style={{backgroundColor:'rgba(0, 0, 0, 0.8)', padding:'15px', borderRadius:'20px'}}>
                <label style={{fontWeight:'bold', marginBottom:'15px'}}>Email Adress:</label> <br/><br/>
                <input type='email' 
                       style={{width:'500px', height:'40px', borderRadius:'10px', border:'none', marginBottom:'40px'}}
                       name='email'
                       value={email}
                       onChange={handleChange}
                       ></input> <br/>

                <label style={{fontWeight:'bold', marginBottom:'15px'}}>Password:</label> <br/><br/>
                <input type='text' 
                       style={{width:'500px', height:'40px', borderRadius:'10px', border:'none', marginBottom:'40px'}}
                       name='password'
                       value={password}
                       onChange={handleChange}
                       ></input><br/>
                </div>
                <button type="submit" style={{marginLeft:'150px', width:'200px', height:'40px', borderRadius:'15px', border:'none', backgroundColor:'yellow', fontWeight:'bold', marginTop:'20px'}}>Login</button>
            </form>
        
        
    </div>
  )
}

export default Login