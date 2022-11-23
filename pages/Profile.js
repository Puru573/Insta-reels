import React from 'react'
import Profile from '../Component/Profile'
import { useContext } from 'react'
import { AuthContext } from '../Context/auth'
import { useRouter } from 'next/router'
function profile() {
  const {user}=useContext(AuthContext);
  const Redirect=()=>{
    const router=useRouter();
    // router.push("/login");
  }
  return (
    //this component will only be visible when we are logged in,so a protect route will be wrapped
    <>
        {user?.uid?
      <Profile/>:<Redirect/>}
    </>

    
  
  )
}

export default profile