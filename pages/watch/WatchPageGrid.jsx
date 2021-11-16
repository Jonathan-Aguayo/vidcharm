import { Grid } from '@mui/material'
import { maxHeight } from '@mui/system'
import { useRouter } from 'next/router'
import React from 'react'


export default function WatchPageGrid(props) {
      const recommendationCSS ={
            display:"grid",
            gridTemplateColumns: "30% 30% 30% 30% 30% 30% 30%" , 
            marginTop : "10px",
            marginLeft : "50px",
            margineRight : "50px",
            //margin: "15% auto",
            //background: "gray",
            overflow: "auto",

      }
      const recommendationcontainer={
            display:"block",
            margin: "10 px",
            padding: "10px",

      }
      const recVideos = {
            "max-width":"100px",
            "max-height":"90px",
            height: "75px",
      }
      const vid ={
            margin:"auto",
            display:"block",
            maxWidth: "100%",
            maxHeight: "100%",
      }

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
    
    return(
<>
<title> VidCharm Watch Page</title>
      <Grid container spacing={2} style={{}}>
      <Grid container direction={'row'} item xs={10} style={{}}>
      <video width='100%' height='550' autoPlay controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
                  <source src= {state.url}/>
                 </video>
                 
</Grid>
<Grid item xs={2} style={{}}>
      <h1> Comments </h1>
      <Grid container style={{}}>
                        <Grid item xs={12} style={{ "border-bottom": '1px solid gray'}}>
      <h1> comment retrieved from database </h1>
</Grid>
                        <Grid item xs={12} style={{ "border-bottom":'1px solid gray' }}>
      <h1> comment retrieved from database </h1>
</Grid>
                        <Grid item xs={12} style={{ "border-bottom": '1px solid gray'}}>
      <h1> comment retrieved from database </h1>
</Grid>
</Grid>

</Grid>

<Grid item xs={10} style={{ }}>
  <h1>Recommendations</h1>
</Grid>

<Grid container spacing={2} style={{}}>
      <div class="recommendationCSS" style={recommendationCSS}>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos" style={{recVideos}}>
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{ vid}}key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos" style={{recVideos}}>
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos">
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg'  key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos">
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg'  key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos">
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>
                  <div class= "recommendationcontainer"style={recommendationcontainer}>
                  <div class = "recVideos">
                  <video width='100%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg'  key={state.url}> 
                  <source src= {state.url}/>    </video>
                        </div>
                  </div>


      </div>
{/*
<Grid item xs={4} style={{ marginLeft: '100px' }}>
 <video width='50%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
                  <source src= {state.url}/>
    </video>
</Grid>
<Grid item xs={4}>
 <video width='50%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
                  <source src= {state.url}/>
    </video>
</Grid>
<Grid item xs={4}>
 <video width='50%' height='275' controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
                  <source src= {state.url}/>
    </video>
</Grid>
*/}

</Grid>

</Grid>
</>
    );
  }
  