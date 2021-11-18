import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import PrimarySearchAppBar from '/components/AppBar.jsx'
import WatchPageGrid from './WatchPageGrid'
import { PrismaClient} from '@prisma/client';
import InputWithIcon from './addcomment'
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useSession } from 'next-auth/client';
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'
//We want to get the [video] part of the url and try to request the object from amazon s3 
export default function Home(props) {
  const [session, loading] = useSession()
  const [newComment,setNewComment] = React.useState('')
  const [commentBody, setCommentBody] = React.useState(JSON.parse(props.comments))
  const video = JSON.parse(props.video)

    async function submitComment()
    {
        const data ={
            comment:newComment,
            email: session.user.email,
            videoId: video.vId,
        }
       const res = await fetch('/api/postComment',{
                                    method:'POST',
                                    body:JSON.stringify(data),
                                    headers: {
                                      'Content-Type': 'application/json',
                                      'Accept':'*/*'
                                    },
                                })
        if(res.ok)
        {
          const uploadedComment = await res.json()
          const newCommentBody = commentBody.slice()
          newCommentBody.push(uploadedComment)
          setCommentBody(newCommentBody)
        }
    }

  return (
    <>
      <title> VidCharm Watch Page</title>
      <Grid container spacing={2}>
        <Grid container direction={'row'} item xs={10} >
          <video width='100%' height='550' autoPlay controls poster={video.posterUrl} style={{ marginTop: '10px' }}>
            <source src={video.vidUrl} />
          </video>

        </Grid>
        <Grid item xs={2} style={{}}>
 
        </Grid><Grid item xs={12}>  </Grid>
        <Grid item xs={12}><Typography variant="h2"> {video.title} </Typography> </Grid>
        <Grid item xs={.2}><Typography variant="subtitle"></Typography> </Grid>
        <Grid item xs={11.8}><Typography variant="subtitle"> Views {video.views} </Typography> </Grid>
        <Grid item xs={12}><Typography variant="subtitle2"> {video.description} </Typography> </Grid>
<Grid item xs={12}>          <h1 style={{marginLeft:"20px", borderTop:"1px solid gray"}}>Comments</h1></Grid>
        {
            session?
            <Grid container spacing={2}>
                <Grid item>
                    <Avatar style={{marginLeft:"30px"}} alt={session?.user?.name} src={session?.user?.image} />
                </Grid>
                <Grid item container justifyContent="left" item xs zeroMinWidth>
                    <TextField 
                    id="input-with-sx" 
                    label="Add a comment!" 
                    variant="standard" 
                    multiline
                    value={newComment}
                    onChange={(event)=>{setNewComment(event.target.value);}}/>  
                    <Button onClick={submitComment}>Post</Button>             
                </Grid>
            </Grid> 
            :<p></p>
        }
        <Grid container item xs={6} >
 
        {commentBody.length > 0 ?
            commentBody.map((comment, index) =>

              <div>
                        <Grid container spacing={2}>
          <Grid item>
            <Avatar style={{marginLeft:"30px"}} alt={comment.author.name} src={comment.author.image} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}>{comment.author.name}</h4>
            <p style={{ textAlign: "left" }}>
              {comment.body}{" "}
            </p>
            <p style={{ textAlign: "left", color: "gray" }}>
            <ThumbUpAltOutlinedIcon></ThumbUpAltOutlinedIcon>
          <ThumbDownOutlinedIcon></ThumbDownOutlinedIcon>
            </p>
          </Grid>
        </Grid>
{/*
<Box sx={{ flexGrow: 1 }} style={{marginLeft:"15px"}}>
      <Grid container spacing={2}>
        <Grid container item xs={8} justifycontent="flex-end">
          <Grid item>
           <Avatar src={comment.author.image}> </Avatar>
          </Grid>
          <Grid>
          <Typography style={{ fontSize:30, fontWeight:"bold"}}>
            {comment.author.name} </Typography>
            </Grid>
        </Grid>
        <Grid alignItems="flex-start" xs={4}>

        </Grid>
        <Grid item xs={8}>
          <div>
          <ThumbUpAltOutlinedIcon></ThumbUpAltOutlinedIcon>
          <ThumbDownOutlinedIcon></ThumbDownOutlinedIcon>
          </div>
        </Grid>
        <Grid alignItems="flex-start" xs={4}>
          <Typography style={{fontSize:30}}> {comment.body} </Typography>
        </Grid>
      </Grid>
    </Box>
*/}
              </div>

            ) :
            <p> No comments available</p>
          }
        </Grid>

      </Grid>
    </>
  );
}
const recommendationCSS = {
  display: "grid",
  gridTemplateColumns: "30% 30% 30% 30% 30% 30% 30%",
  marginTop: "10px",
  marginLeft: "50px",
  margineRight: "50px",
  //margin: "15% auto",
  //background: "gray",
  overflow: "auto",

}
const recommendationcontainer = {
  display: "block",
  margin: "10 px",
  padding: "10px",

}
const commentOrg= {
width:"100px",
float:"left",
height:"100px",
background:"yellow", 
margin:"10px",
}

export async function getServerSideProps(context) 
{
    const { req } = context
    const prisma = new PrismaClient();
  //Need the session to get the email because thats how we are identifying the user
    const video = await prisma.video.findFirst({
        where:{
            author:{
                id:context.query.channel
            },
            title:context.query.video
        }
    })

    const comments = await prisma.comment.findMany({
        where:
        {
            vId: video.vId
        },
        include:{
            author:true,
            source:true
        }
    })


    return {props:{video:JSON.stringify(video), comments :JSON.stringify(comments)}}
}
    

