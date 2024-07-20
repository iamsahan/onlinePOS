import React from 'react'
import Lottie from 'lottie-react'

import Animation from '../../assets/Animation - 1721452147257-2.json'

const Signup = () => {
  return (
    <div style={{color:'white'}}>
        <Lottie animationData={Animation} style={{ position:'absolute', bottom:'0', zIndex:'-1', marginTop:'80px', left:'0', }}/>
        <Lottie animationData={Animation} style={{ position:'absolute', top:'0', zIndex:'-1', marginTop:'80px', right:'0', rotate:'180deg'}}/>
        <div style={{position:'absolute', top:'5%', left:'30%'}}>
            <h2 style={{fontSize:'50px', marginBottom:'40px'}}>Register With CloudPos</h2>
            <form>
            
                <label style={{fontWeight:'bold', marginBottom:'15px'}}>Email Adress:</label> <br/><br/>
                <input type='email' style={{width:'500px', height:'40px', borderRadius:'10px', border:'none', marginBottom:'40px',}}></input> <br/>
                <label style={{fontWeight:'bold', marginBottom:'15px'}}>Password:</label> <br/><br/>
                <input type='text' style={{width:'500px', height:'40px', borderRadius:'10px', border:'none', marginBottom:'40px'}}></input><br/>
         
                <button style={{marginLeft:'150px', width:'200px', height:'40px', borderRadius:'15px', border:'none', backgroundColor:'yellow', fontWeight:'bold', marginTop:'20px'}}>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Signup