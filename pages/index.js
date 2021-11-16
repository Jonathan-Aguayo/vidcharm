import { Grid } from '@mui/material'
import { useSession } from 'next-auth/client';
import Vid from '../components/Vid';
import VidList from '../components/VidList';
import { useRouter } from 'next/router'

export default function Home() {

  const { data: session } = useSession()
  const list = [{
    title:"Testing Video 1",
    url:"/watch/WIN_20210128_13_20_53_Pro.mp4",
    image:'https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg',
    channel:"Channel 1",
  },
  {
    title:"Testing Video 2",
    url:"/watch/WIN_20210128_13_20_53_Pro.mp4",
    image:'https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg',
    channel:"Channel 2",
  },
  {
    title:"Testing Video 3",
    url:"/watch/WIN_20210128_13_20_53_Pro.mp4",
    image:'https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg',
    channel:"Channel 3",
  },
  {
    title:"Testing Video 4",
    url:"/watch/WIN_20210128_13_20_53_Pro.mp4",
    image:'https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg',
    channel:"Channel 4",
  },
  {
    title:"Testing Video 5",
    url:"/watch/WIN_20210128_13_20_53_Pro.mp4",
    image:'https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg',
    channel:"Channel 5",
  },
  {
    title:"Testing Video 6",
    url:"/watch/WIN_20210128_13_20_53_Pro.mp4",
    image:'https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg',
    channel:"Channel 6",
  },
  {
    title:"Testing Video 7",
    url:"/watch/WIN_20210128_13_20_53_Pro.mp4",
    image:'https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg',
    channel:"Channel 7",
  },
  {
    title:"Testing Video 8",
    url:"/watch/WIN_20210128_13_20_53_Pro.mp4",
    image:'https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg',
    channel:"Channel 8",
  }]
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
      <h1></h1>
      <VidList list={list}/>
    </div>

  )
}

export async function getStaticProps(){
  const REQUEST_URL = '';
  //const API_KEY = 
  //const All_VIDEOS = 

  return{
    props:{
      results: 'test'   
    },
    revalidate: 10,
  }
}