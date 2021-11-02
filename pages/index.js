import { Grid } from '@mui/material'
import PrimarySearchAppBar from '../components/AppBar.jsx'
export default function Home() {
  return ( 
    <div>

      <PrimarySearchAppBar name='user'/>
      {/*The grid container is a material UI element that helps you organize the web page and resize everything dynamically*/}
      <Grid container>
        {/*This container item will span the entire width of the page*/}
        <Grid item xs={12}>
          {/*eventually, we want to get the poster and video source from the url, this is just an example */}
          <video width='100%' height='550' autoPlay controls poster='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb-poster.jpg' style={{marginTop:'10px'}} >
            <source src='https://vidcharm-bucket-1.s3.us-west-1.amazonaws.com/bbb_sunflower_native_60fps_stereo_abl.mp4'/>
          </video>
        </Grid>
      </Grid>
    </div>

  )
}
