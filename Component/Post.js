import React, { useEffect,useState} from 'react'
import { Avatar } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite';
import {doc,updateDoc, arrayRemove, arrayUnion} from 'firebase/firestore'
import {db}from"../firebase";
// import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCommentIcon from '@mui/icons-material/AddComment';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Displaycomment from './Displaycomment';
import {  CardActionArea, CardActions } from '@mui/material';


import Comments from './Comments';
import * as ReactDOM from 'react-dom'


function Post({postData,userData}) {
    // console.log("123456",postData)
    const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    const[like,setLike]=useState(false);
    const[isMute,setIsMute]=useState(false);
    useEffect(()=>{
      if(postData.likes.includes(userData.uid)){
        setLike(true);
      }
      else{
        setLike(false);
      }
    },[postData])

    const handleLike=async()=>{
      if(like){
        await updateDoc(doc(db,"posts",postData.postId),{
          likes:arrayRemove(userData.uid),
        });
      }
      else{
        await updateDoc(doc(db,"posts",postData.postId),{
          likes:arrayUnion(userData.uid)
        }
        )
       
      }
    }
    const handlemute=()=>{
      if(isMute){
        setIsMute(false);
      }
      else setIsMute(true);
    }
    const handleNextVideo=(e)=>{
      //get the next video
      let nextVideo=ReactDOM.findDOMNode(e.target).parentNode.nextSibling;
      if(nextVideo){
        nextVideo.scrollIntoView({behavior:"smooth"});
      }

    }
  return (
    <div className='post-container'>
    <video src={postData.postURL} muted={isMute}onClick={handlemute}
    onEnded={handleNextVideo} controls/>

      <div className='video-info'>
        <div className="avatar-container">
        <Avatar alt="Remy Sharp" src={postData.profilePhotoURL} sx={{margin:"0.5rem"}} />
        <p>{postData.profileName}</p>
        </div>
        <div className="post-like"><FavoriteIcon  onClick={handleLike}/>
        <p style={{color:"white"}}>{postData.likes.length}</p>
        <AddCommentIcon onClick={handleClickOpen} style={{color:"white"}}/>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxwidth="md"
      >
        <div className="modal-container">
          <div className="video-modal">
          <video autoPlay controls muted src={postData.postURL}/>
          </div>
          <div className="comments-modal">
          <Card className="card1" >
            <Displaycomment postData={postData}/>
    </Card>
        {/* heart */}
    <Card className="card2">
      <Typography
      sz={{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}
      >
        
                {postData.likes.length == 0
                  ? "Be the first one to like this post"
                  : `Liked by ${postData.likes.length} users`}
                     
        
      </Typography>
      <div className="post-like2">
        <FavoriteIcon style={like ? { color: "red" } : { color: "black" }}onClick={handleLike}/>
          <p style={{color:"white"}}>{postData.likes.length}</p>
      
      <Comments userData={userData} postData={postData}/>
                      
    </div>

    </Card>

    
 
        

          </div>
        </div>
      </Dialog>
        </div>
      </div>
    </div>
  )
}

export default Post