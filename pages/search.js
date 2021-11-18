import VidList from '../components/VidList';
import React from 'react';
import { PrismaClient } from "@prisma/client"
import Typography from '@mui/material/Typography'
export default function Home(props) {
    const loadedvids = JSON.parse(props.videos)
  return ( 
    <div>
    {
        loadedvids.length > 0?
        <VidList list={JSON.parse(props.videos)}/>
        :
        <Typography>No videos to show</Typography>
    }
    </div>
  )
}

export async function getServerSideProps(context) 
{
  const {req} = context
  const keywords = context.query.key
  const prisma = new PrismaClient();
  //Need the session to get the email because thats how we are identifying the user
  const videos = await prisma.video.findMany({
    where:{
        title:{contains:keywords}
    },
    include:{
        author:true
    }
    })
  return {props:{ videos: JSON.stringify(videos)}}
  prisma.$disconnect();
}
