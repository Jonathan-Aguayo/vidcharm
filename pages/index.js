import { Grid } from '@mui/material'
import { useSession } from 'next-auth/client';
import Vid from '../components/Vid';
import VidList from '../components/VidList';
import { useRouter } from 'next/router'
import React from 'react';
import { PrismaClient } from "@prisma/client"

export default function Home(props) {

  const { data: session } = useSession()

  return ( 
    <div>
      {/* The grid container is a material UI element that helps you organize the web page and resize everything dynamically */}
      <Grid container justifyContent='space-around'>
        {/*This container item will span the entire width of the page*/}
        <Grid item xs={10}>
          {/* <p>Home page</p>     */}
          {/* <p>Link to <Link href='/watch/WIN_20210128_13_20_53_Pro.mp4'><a >video</a></Link></p> */}         
        </Grid>
      </Grid>
      <VidList list={JSON.parse(props.videos)}/>
    </div>
  )
}

export async function getServerSideProps(context) {
  const {req} = context
  const prisma = new PrismaClient();
  //Need the session to get the email because thats how we are identifying the user
  const videos = await prisma.video.findMany({include:{author:true}});
  return {props:{ videos: JSON.stringify(videos)}}
  prisma.$disconnect();
}
