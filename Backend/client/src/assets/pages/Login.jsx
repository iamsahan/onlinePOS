import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [user, setUser] = useState('');
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8090/employees/login', { phone, password });
      console.log('Login successful:', response.data);
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      if (user.role === "manager" || user.role === "admin") {
        navigation("/employees/allEmployee");
      } else if (user.role === 'cashier') {
        // navigation('/additems');
      } else {
        // navigation('/');
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  const styles = {
    container: {
      marginTop: '200px',
      maxWidth: '600px',  // Increased container width
      margin: 'auto',
      padding: '30px',  // Increased padding for a better layout
      border: '1px solid #333',
      borderRadius: '8px',
      backgroundColor: '#1a1a1a',
      color: '#fff'
    },
    input: {
      width: '90%',
      padding: '15px',  // Increased padding for better touch interaction
      marginBottom: '20px',  // Increased margin for better spacing
      
      borderRadius: '5px',
      border: '0.5px solid #555',
      backgroundColor: '#333',
      color: '#fff',
      fontSize: '18px'  // Larger font size for better readability
    },
    button: {
      width: '30%',
      padding: '15px 0',  // Thicker button for easier interaction
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      fontSize: '15px'  // Larger text on button
    },
    label: {
      marginBottom: '10px',  // More spacing
      display: 'block',
      fontSize: '16px'  // Larger label text
    },
    error: {
      color: '#f44336',
      marginBottom: '20px',  // More visible error message
      fontSize: '16px'  // Larger text for readability
    }
  };

  return (
    <div style={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="phone" style={styles.label}>Phone:</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
          />
        </div>
        <div>
          <label htmlFor="password" style={styles.label}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

export default Login;
