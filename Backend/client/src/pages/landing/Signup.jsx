import React, { useState } from 'react'
import Lottie from 'lottie-react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

import Animation from '../../assets/Animation - 1721452147257-2.json'

const Signup = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })

  const { username, email, password } = formData;

  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleRegister = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/api/auth/register', formData);
      const { token } = response.data;

      localStorage.setItem('token', token);

      console.log(token);
      swal("Good job!", "Supplier Added Successfully!", "success");
      navigate('/cashier');
      
    } catch (err) {
      console.error('Error adding supplier:', err);
      console.log(token);
    }
  }

  return (
    <div style={{color:'white'}}>
        <Lottie animationData={Animation} style={{ position:'absolute', bottom:'0', zIndex:'-1', marginTop:'80px', left:'0', }}/>
        <Lottie animationData={Animation} style={{ position:'absolute', top:'0', zIndex:'-1', marginTop:'80px', right:'0', rotate:'180deg'}}/>
        <div style={{position:'absolute', top:'8%', left:'30%'}}>
            <h2 style={{fontSize:'50px', marginBottom:'80px'}}>Register With CloudPos</h2>

            <form onSubmit={handleRegister}>

                <label style={{fontWeight:'bold', marginBottom:'15px'}}>User Name:</label> <br/><br/>
                <input type='text' 
                       name='username'
                       style={{width:'500px', height:'40px', borderRadius:'10px', border:'none', marginBottom:'40px',}}
                       value={username}
                       onChange={handleChange}></input> <br/>

                <label style={{fontWeight:'bold', marginBottom:'15px'}}>Email Adress:</label> <br/><br/>
                <input type='email' 
                       name='email'
                       style={{width:'500px', height:'40px', borderRadius:'10px', border:'none', marginBottom:'40px',}}
                       value={email}
                       onChange={handleChange}></input> <br/>

                <label style={{fontWeight:'bold', marginBottom:'15px'}}>Password:</label> <br/><br/>
                <input type='text' 
                       name='password'
                       style={{width:'500px', height:'40px', borderRadius:'10px', border:'none', marginBottom:'40px'}}
                       value={password}
                       onChange={handleChange}></input><br/>

                {/* <input type="checkbox" name="vehicle3" style={{marginRight:'15px'}}/>
                <label for="vehicle3"> I Agree terms and conditions</label><br></br> */}
         
                <button type="submit" style={{ marginLeft:'150px', width:'200px', height:'40px', borderRadius:'15px', border:'none', backgroundColor:'yellow', fontWeight:'bold', marginTop:'40px'}}>Register</button>
            </form>
        </div>
    </div>
  )
}

export default Signup