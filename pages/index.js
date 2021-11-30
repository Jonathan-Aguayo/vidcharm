import VidList from '../components/VidList';
import React from 'react';
import { PrismaClient } from "@prisma/client"
import { Box, Heading, SimpleGrid } from "@chakra-ui/layout";
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link'
import Avatar from '@mui/material/Avatar'
import Grid from '@mui/material/Grid'

export default function Home(props) {

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
      <Box width="100%" mx='auto' my={4}>
        <Heading my={8} textAlign="center">
          VidCharm Most Popular Video
        </Heading>
        <Box maxWidth="720px" mx="auto" p={4} borderRadius="lg" boxShadow='2x1' my={1}>
          <video width='100%' height='550' autoPlay controls poster={JSON.parse(props.popularvideo).posterUrl} style={{ marginTop: '10px' }}>
            <source src={JSON.parse(props.popularvideo).vidUrl} />
          </video>
          {/* <div className="card-body row">
                        <Avatar className="col-auto" colSpan={1} style={{marginLeft:"5px"}} alt={JSON.parse(props.popularvideo).author.name} src={JSON.parse(props.popularvideo).author.image}></Avatar>
                        <h5 className="card-title col-sm">
                              <a className="stretched-link" href={JSON.parse(props.popularvideo).url}>
                                    <a> {JSON.parse(props.popularvideo).title} </a> 
                              </a>
                        </h5>
                        <p className="card-text">{JSON.parse(props.popularvideo).channel}</p>                
          </div> */}
        </Box>      
      </Box>
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
  const popularvideo = await prisma.video.findFirst({
    where: { title: 'coffin dancing' },
    include:{author:true},
  })
  return {props:{ videos: JSON.stringify(videos), popularvideo: JSON.stringify(popularvideo)}}
  
}