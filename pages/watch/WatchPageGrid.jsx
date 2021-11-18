import { Grid } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
//import commentBox from'./.../components/commentBox.tsx'

import { PrismaClient, Comment, Prisma } from '@prisma/client';

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
            maxWidth:"100px",
            maxHeight:"90px",
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

      
</>)}
