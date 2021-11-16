import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
require('dotenv').config();
import React from 'react'
import PrimarySearchAppBar from '/components/AppBar.jsx'
import WatchPageGrid from './WatchPageGrid'
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
      <WatchPageGrid></WatchPageGrid>
    </div>

  )
}