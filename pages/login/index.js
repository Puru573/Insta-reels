import React,{useContext, useEffect} from 'react'
import TextField from '@mui/material/TextField';
import Image from 'next/image'
import logo from '../../assets/Insta.jpeg'

import Button from '@mui/material/Button';
import { Carousel } from 'react-responsive-carousel';
import bg1 from '../../assets/bg1.jpg'
import bg2 from '../../assets/bg2.jpg'
import bg3 from '../../assets/bg3.jpg'
import bg4 from '../../assets/bg4.jpg'
import bg5 from '../../assets/bg5.jpg'
import {AuthContext} from '../../Context/auth'
import { useRouter } from 'next/router';
import Link from 'next/Link';



function index() {
  const [email,setEmail]=React.useState('');
  const [password,setPassword]=React.useState('');
  const [error,setError]=React.useState('');
  const [loading,setLoading]=React.useState(false);
  const router=useRouter();

  const {login,user}=useContext(AuthContext);
  useEffect(()=>{
    if(user){
      router.push("/");
   
    }
  },[user])
  let handleClick=async()=>{
    try{
      console.log(email);
      console.log(password);
      setLoading(true);
  
      setError('');
      await login(email,password);
     
      console.log("logged in");
    }
    catch (err){
      console.log("error",JSON.stringify(err));
      setError(err.code);
      //useSettimeout to remove error within 2 sec
      setTimeout(()=>{
        setError('');
      },2000);
    }
    setLoading(false);
    
  }
    return (
      <div className='login-container'>
        <div className="insta-mob-bg">
            <div className="carousel">
                <Carousel autoPlay="true" interval="2000" infiniteLoop showArrows={false} showThumbs={false} showIndicators={false} stopOnHover showStatus={false}>
                    <Image style={{width:"16rem",height:"28rem",marginTop:"5.2rem",marginLeft:"5.5rem"}}src={bg1}/>
                    <Image style={{width:"16rem",height:"28rem",marginTop:"5.2rem",marginLeft:"5.5rem"}} src={bg2}/>
                    <Image style={{width:"16rem",height:"28rem",marginTop:"5.2rem",marginLeft:"5.5rem"}}src={bg3}/>
                    <Image style={{width:"16rem",height:"28rem",marginTop:"5.2rem",marginLeft:"5.5rem"}}src={bg4}/>
                    <Image style={{width:"16rem",height:"28rem",marginTop:"5.2rem",marginLeft:"5.5rem"}}src={bg5}/>

                </Carousel>
            </div>
        </div>
        <div>
        <div className='login-card'>
  
  <div className='Image'>
  <Image src={logo}/>
  </div>



  <TextField id="outlined-basic" 
  size="small"
  label="Email"
  variant="outlined" 
  margin="dense"
  fullWidth
  value={email}
  onChange={(e)=>setEmail(e.target.value)}
   />
  
  <TextField id="outlined-basic" 
  size="small"
  label="Password"
  variant="outlined" 
  margin="dense"
  type="password"
  fullWidth
  value={password}
  onChange={(e)=>setPassword(e.target.value)} 
  />
  {
    error !="" &&
      <div style={{color:"red"}}>{error}</div>
  }

  <div className="tnc"><Link  href='/forgot'>Forget Password?</Link></div>

<Button  style={{top:"1rem"}}variant="contained" component="label" fullWidth onClick={handleClick} disabled={loading}>
    LOG IN
</Button>

  
</div>
<div className="log-card" > Don't have an account?<Link href='/signup'><span style={{color:"blueviolet"}}>Signup</span></Link></div>
        </div>

                  
      </div>
  
    )
  }
  
  export default index
  