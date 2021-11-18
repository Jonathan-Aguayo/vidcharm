import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import PrimarySearchAppBar from '/components/AppBar.jsx'
import WatchPageGrid from './WatchPageGrid'
import { PrismaClient, Comment, Prisma } from '@prisma/client';
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
  const prisma = new PrismaClient();
//We want to get the [video] part of the url and try to request the object from amazon s3 
export default function Home(props) {
  const [session, loading] = useSession()
  const router = useRouter()
  //Video will just be whatever string is after the /watch in the url
  const { video } = router.query
  //Initialize the urls to empty string to avoid errors
  const [state, setState] = React.useState({ url: '' })

  //use effect will only run when the value of video changes
  React.useEffect(() => {
    //Upon first render, video will be null but it will eventuall be equal to the string after/watch/
    if (!video)
      return
    getObject()
  }, [video]);

  //Function to attempt to retrieve the object from s3 bucket through our rest api
  function getObject() {
    //Fetch is the library I used to make api calls to our backend
    fetch(`/api/getVideo/${video}`).then(res => {
      if (res.ok) {
        res.json().then(data => {
          setState({ url: data.videourl })
        })
      }
    })
  }

  const commentBody = JSON.parse(props.comments)
  console.log(commentBody)
  //console.log(commentBody[0].source)
  return (

    <>
      <title> VidCharm Watch Page</title>
      <Grid container spacing={2} style={{}}>
        <Grid container direction={'row'} item xs={10} style={{}}>
          <video width='100%' height='550' autoPlay controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{ marginTop: '10px' }} key={state.url}>
            <source src={state.url} />
          </video>

        </Grid>
        <Grid item xs={2} style={{}}>
          <Grid container style={{}}>
            <Grid item xs={12} style={{}}>
              <h1>



      

              </h1>
            </Grid>
          </Grid>

        </Grid><Grid item xs={12}>  </Grid>
        <Grid item xs={12}><Typography variant="h2"> {commentBody[0].source.title} </Typography> </Grid>
        <Grid item xs={.2}><Typography variant="subtitle"></Typography> </Grid>
        <Grid item xs={11.8}><Typography variant="subtitle"> Views {commentBody[0].source.views} </Typography> </Grid>
        <Grid item xs={12}><Typography variant="subtitle2"> {commentBody[0].source.description} </Typography> </Grid>
<Grid item xs={12}>          <h1 style={{marginLeft:"20px", borderTop:"1px solid gray"}}>Comments</h1></Grid>
<Grid container spacing={2}>
          <Grid item>
            <Avatar style={{marginLeft:"30px"}} alt={session?.user?.name} src={session?.user?.image} />
          </Grid>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <h4 style={{ margin: 0, textAlign: "left" }}></h4>
            <TextField id="input-with-sx" label="Add a comment!" variant="outlined" multiline rows={3} />
            <p style={{ textAlign: "left", color: "gray" }}>

            </p>
          </Grid>
        </Grid> 
        <Grid container item xs={6} >
 
        {commentBody.length > 0 ?
            commentBody.map((comment, index) =>

              <div>
<Box style={{borderBottom: "1px solid black"}} sx={{ '& > :not(style)': { m: 1 } }}>
<Grid container spacing={2}>
<Grid xs={6}> </Grid>
<p> {comment.author.name} </p>
<Avatar src={comment.author.image}> </Avatar>
<p> {comment.body} </p>

  <Grid item xs={6}><p> {comment.like} </p>  </Grid>
<Grid xs={6}><ThumbUpAltOutlinedIcon /> 
<ThumbDownOutlinedIcon/>
</Grid>
  <Grid item xs={6}>
<p> {comment.dislike}</p>
  </Grid>

</Grid>

<div style={{commentOrg}}> 



</div>


    </Box>
                <p></p>
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

export async function getServerSideProps(context) {
  const { req } = context
  //Need the session to get the email because thats how we are identifying the user
  const comments = await prisma.comment.findMany({
    where:
    {
      vId: "1"
    },
include:{
	author:true,
  source:true
}
  })
  return {
    props: { comments: JSON.stringify(comments) }

  }

}