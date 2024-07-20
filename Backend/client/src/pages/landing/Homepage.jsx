import React from 'react'
import Lottie from 'lottie-react'

import Animation from '../../assets/Animation - 1721397295071.json'
import Animation1 from '../../assets/Animation - 1721398717968.json'
import Animation2 from '../../assets/Animation - 1721398650450.json'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {

    const navigate = useNavigate()

    const handleSignUp = () => {
        navigate('/signup');
    }

    const handleLogin = () => {
        navigate('/login');
    }
  return (
    <div className="" style={{ }}>
        <h2 style={{color:'white', textAlign:'center', marginTop:'50px', fontSize:'50px'}}> Improve Your Business with<br/> <span style={{color:'red'}}>WEBPOS</span></h2>
        
        <Lottie animationData={Animation1} style={{width: '500px',height: '700px', position: 'absolute', top:'90px', left:'10px'}}/>
        <div style={{marginTop:'70px', textAlign:'center', marginLeft:'auto', marginRight:'auto'}}>
            <Lottie animationData={Animation} style={{height: '350px', position: 'absolute', marginLeft:'35%',  textAlign:'center'}}/>
            <Lottie animationData={Animation2} style={{width: '350px', position: 'absolute', marginLeft:'38%',  zIndex:'-1'}}/>
        </div>
        <Lottie animationData={Animation1} style={{width: '500px',height: '700px', position: 'absolute', top:'90px', right:'40px'}}/>

        <div style={{marginTop:'33%', textAlign:'center'}}>
            <button onClick={handleSignUp} style={{backgroundColor:'yellow', margin:'20px', padding:'10px', borderRadius:'10px', border:'none', fontSize:'20px', width:'100px'}}>Signup</button>
            <button onClick={handleLogin} style={{backgroundColor:'yellow', margin:'20px', padding:'10px', borderRadius:'10px', border:'none', fontSize:'20px', width:'100px'}}>Login</button>
        </div>
    </div>
  )
}

export default Homepage