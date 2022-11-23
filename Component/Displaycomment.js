import { Avatar } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import CircularProgress from "@mui/material/CircularProgress";

function Displaycomment({postData}) {
    const [allComments,setAllComments]=useState([]);
    useEffect(()=>{
        getcomments();
       
    },[postData])
    function getcomments(){
        let tempArray=[];
        postData.comments.map(async(commentId) =>{
         
            const docSnap= await getDoc(doc(db,"comments",commentId));
            tempArray.push(docSnap.data());
             setAllComments(tempArray);
        });
    }
  return (
    <div>
        {allComments==null?(
            <CircularProgress color="success"/>
        ):(
            <>
               {allComments.map(commentObj => {
                        return (
                        <div style={{display:"flex"}}>
                            <Avatar src={commentObj.userDP}/>
                            <p><span style={{fontWeight:"bold"}}>{commentObj.userName}</span>
                            &nbsp;&nbsp;{commentObj.text}</p>
                        </div>
                        );
                        })}
            </>
        )}

    </div>
  );
}

export default Displaycomment