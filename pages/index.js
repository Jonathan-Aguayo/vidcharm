import VidList from '../components/VidList';
import React from 'react';
import { PrismaClient } from "@prisma/client"

export default function Home(props) {

  return ( 
    <div>
      <VidList list={JSON.parse(props.videos)}/>
    </div>
  )
}

export async function getServerSideProps(context) 
{
  const {req} = context
  const prisma = new PrismaClient();
  //Need the session to get the email because thats how we are identifying the user
  const videos = await prisma.video.findMany({include:{author:true}});
  return {props:{ videos: JSON.stringify(videos)}}
  prisma.$disconnect();
}
