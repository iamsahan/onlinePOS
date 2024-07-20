import React from 'react'
import Lottie from 'lottie-react'

import Animation from '../../assets/Animation - 1721412613158.json'

const Login = () => {
  return (
    <div style={{color:'white', alignItems:'center', marginLeft:'auto', marginRight:'auto', display:'flex', flexDirection:'column', marginTop:'100px'}}>
        <Lottie animationData={Animation} style={{height: '650px', position: 'absolute',  textAlign:'center', zIndex:'-1', opacity:'90%'}}/>
       
            <h2 style={{textAlign:'center', marginTop:'50px', marginBottom:'80px', fontSize:'40px'}}>Sign Into Your Account</h2>
            <form>
            <div style={{backgroundColor:'rgba(0, 0, 0, 0.8)', padding:'15px', borderRadius:'20px'}}>
                <label style={{fontWeight:'bold', marginBottom:'15px'}}>Email Adress:</label> <br/><br/>
                <input type='email' style={{width:'500px', height:'40px', borderRadius:'10px', border:'none', marginBottom:'40px'}}></input> <br/>
                <label style={{fontWeight:'bold', marginBottom:'15px'}}>Password:</label> <br/><br/>
                <input type='text' style={{width:'500px', height:'40px', borderRadius:'10px', border:'none', marginBottom:'40px'}}></input><br/>
                </div>
                <button style={{marginLeft:'150px', width:'200px', height:'40px', borderRadius:'15px', border:'none', backgroundColor:'yellow', fontWeight:'bold', marginTop:'20px'}}>Login</button>
            </form>
        
        
    </div>
  )
}

export default Login