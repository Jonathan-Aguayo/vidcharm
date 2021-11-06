import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import PrimarySearchAppBar from '/components/AppBar.jsx'
//We want to get the [video] part of the url and try to request the object from amazon s3 
export default function Home() 
{
    const router = useRouter() 
    const {video} = router.query
    //Initialize the urls to empty string to avoid errors
    const [state, setState] = React.useState({url: ''})

    //use effect will run on every page render and the page will be re-rendered when the src url changes
    React.useEffect( () => 
    {
      if(!video)
        return
      getObject()        
    },[video]);

    function getObject()
    {
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
      <PrimarySearchAppBar name='user'/>
      {/*The grid container is a material UI element that helps you organize the web page and resize everything dynamically*/}
      <Grid container justifyContent='space-around'>
        {/*This container item will span the entire width of the page*/}
        <Grid item xs={10}>
          {/*eventually, we want to get the poster and video source from the url, this is just an example */}
          <video width='100%' height='550' autoPlay controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} key={state.url}> 
            <source src= {state.url}/>
          </video>
        </Grid>
      </Grid>
    </div>
  )
}