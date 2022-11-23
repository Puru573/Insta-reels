import React, { useEffect, useState } from 'react'
import {auth} from '../firebase';
export const AuthContext=React.createContext();
import { createUserWithEmailAndPassword,onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { SettingsInputSvideoRounded } from '@mui/icons-material';


function authWrapper({children}) {
  const [user,setUser]=useState('');
  const[loading,setLoading]=useState(true);
    console.log("Hello in auth wrapper");

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setUser(user);
        }
      
        
        else{
          setUser('');
          //sign out
          
        }
      })
      setLoading(false);
    },[])
    //feature created
    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password);
    }
    function logout(){
      return signOut(auth);
    }

    function forgetPassword(email){
      return sendPasswordResetEmail(auth,email);
    }

    function signup(email,password){
      return createUserWithEmailAndPassword(auth, email, password)
    }
    const store={
        login,
        user,
        logout,
        forgetPassword,
        signup
    }
  return ( 
    <AuthContext.Provider value={store}>{!loading && children}</AuthContext.Provider>
  )
}

export default authWrapper