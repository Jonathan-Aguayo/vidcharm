import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import PrimarySearchAppBar from '/components/AppBar.jsx'
//We want to get the [video] part of the url and try to request the object from amazon s3 
export default function Home() 
{
    const router = useRouter() 
    //Video will just be whatever string is after the /watch in the url
    const {video} = router.query
    //Initialize the urls to empty string to avoid errors
    const [state, setState] = React.useState({url: ''})

    //use effect will only run when the value of video changes
    React.useEffect( () => 
    {
      //Upon first render, video will be null but it will eventuall be equal to the string after/watch/
      if(!video)
        return
      getObject()        
    },[video]);

    //Function to attempt to retrieve the object from s3 bucket through our rest api
    function getObject()
    {
      //Fetch is the library I used to make api calls to our backend
      fetch(`/api/getVideo/${video}`).then(res =>
      {
        if(res.ok)
        {
          res.json().then(data =>
          {
            setState({url: data.videourl})
          })
        }
      })
    }

  return ( 
    <div>
 <title> VidCharm Watch Page</title>
      <PrimarySearchAppBar name='user'/>
      <Grid container spacing={2} style={{}}>
      <Grid container direction={'row'} item xs={10} style={{}}>
      <video width='100%' height='550' autoPlay controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
                  <source src= {state.url}/>
                 </video>
                 
</Grid>
<Grid item xs={2} style={{}}>
      <h1> Comments </h1>
      <Grid container style={{}}>
      <Grid item xs={12} style={{}}>
      <h1> comment retrieved from database </h1>
</Grid>
<Grid item xs={12} style={{}}>
      <h1> comment retrieved from database </h1>
</Grid>
<Grid item xs={12} style={{}}>
      <h1> comment retrieved from database </h1>
</Grid>
</Grid>

</Grid>

<Grid item xs={10} style={{}}>
  <h1>Recommendations</h1>
</Grid>

<Grid container spacing={2} style={{ }}>

<Grid item xs={4}>
<video width='50%' height='275' autoPlay controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
                  <source src= {state.url}/>
                 </video>
</Grid>
<Grid item xs={4}>
<video width='50%' height='275' autoPlay controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
                  <source src= {state.url}/>
                 </video>
</Grid>
<Grid item xs={4}>
<video width='50%' height='275' autoPlay controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
                  <source src= {state.url}/>
                 </video>
</Grid>


</Grid>

</Grid>
    </div>

  )
}