import React,{useContext,useEffect,useState}from 'react'
import Navbar from './Navbar'
import Upload from './Upload'
import Avatar from '@mui/material/Avatar';

import {AuthContext} from '../Context/auth'
import { collection, doc,onSnapshot, orderBy, query } from 'firebase/firestore';
import {db}from '../firebase';
import Post from './Post'
import { UpdateDisabled } from '@mui/icons-material';
function Feed() {
  const {user}=useContext(AuthContext);
  const [userData,setUserData]=useState({});
  const [posts,setPosts]=useState ([]);
  useEffect(()=>{
    console.log(user.uid);
    // read the user info from db
    const unsub=onSnapshot(doc(db,"users",user.uid),(doc)=>{
      console.log("Current data",doc.data());
      setUserData((doc.data()));
    });
    return ()=>{unsub()};
  },[user]);
  //get posts from db

  useEffect(()=>{
    console.log("user",UpdateDisabled);
    // read the user info from db
    const unsub=onSnapshot(query(collection(db,"posts"),orderBy("timestamp","desc")),
    (snapshot)=>{
      let tempArray=[];
      snapshot.docs.map(doc=>tempArray.push(doc.data()))
      // console.log("Current data",doc.data());
      setPosts([...tempArray]);
    });
    return ()=>{unsub()};
  },[]);

  const callback = (entries) => {
    entries.forEach((entry) => {
      let ele = entry.target.childNodes[0];
      
      console.log(ele);
      ele.play().then(() => {
        if (!ele.paused && !entry.isIntersecting) {
          console.log("123", entry.isIntersecting);
          ele.pause();
        }
      });
    });
  };
  let options = {
    // root: document.querySelector("#scrollArea"),
    // rootMargin: "0px",
    threshold: 0.6,
  };

  let observer = new IntersectionObserver(callback, options);
  useEffect(() => {
    const elements = document.querySelectorAll(".video-container");
    console.log("wow",elements);
    let postContainer=elements[0].childNodes;
    postContainer.forEach((video)=>{
      console.log("bye",video);
      observer.observe(video);
    })
    return()=>{
      observer.disconnect();
    }
  }, [posts]);
  return (
    <div className='feed-container'>
      <Navbar userData= {userData}/> 
      {/* as a prop pass kya userdata ko */}
      <Upload userData= {userData}/>
      <div className='video-container'>
        {
          posts.map((post)=><Post postData={post} userData={userData}/>)
        }

      </div>


    
      

      
     


    </div>

  )
}

export default Feed